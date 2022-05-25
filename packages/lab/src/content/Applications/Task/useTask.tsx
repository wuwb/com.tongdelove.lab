import { useEffect, useState } from "react";
import { add } from "date-fns";

import TaskService from "services/TaskService";

import RRule from "./RRule";

function prepareOriginalTaskForCreate(originalTask) {
  const newTask = {
    ...originalTask,
  };

  delete newTask.id;
  delete newTask.dtCompleted;

  return newTask;
}

function addFutureDate(task) {
  const converter = {
    DAILY: "days",
    WEEKLY: "weeks",
    MONTHLY: "months",
    YEARLY: "years",
  };
  const rRule = RRule.parseRRule(task.rrule.rule);

  const futureDate = add(new Date(), {
    [converter[rRule.FREQ]]: rRule.INTERVAL,
  });

  const futureTask = {
    ...task,
    dtStart: futureDate,
  };

  return futureTask;
}

function getFutureTask(task) {
  const newTask = prepareOriginalTaskForCreate(task);
  return addFutureDate(newTask);
}

function sortTasks(tasks) {
  return tasks
    .sort(function (a, b) {
      a = new Date(a.dtStart);
      b = new Date(b.dtStart);
      return a > b ? 1 : a < b ? -1 : 0;
    })
    .sort((a, b) => {
      return a.dtCompleted === b.dtCompleted ? 0 : a.dtCompleted ? 1 : -1;
    });
}

export default function useTask(foreignId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!foreignId) return;
    const url = `byforeign/${foreignId}`;
    TaskService.getTasks(url)
      .then((data) => {
        if (data.error) return;
        const sortedData = sortTasks(data);
        setTasks(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [foreignId]);

  const addTask = async (task) => {
    const newTask = await TaskService.addTask(task);
    addToTaskList(newTask);
  };

  const addToTaskList = (task) => {
    const updatedList = [...tasks, task];
    const sortedTasks = sortTasks(updatedList);
    setTasks(sortedTasks);
  };

  const handleCheckCompleted = async (task) => {
    let completedDate;
    if (task.dtCompleted) {
      completedDate = null;
    }
    if (!task.dtCompleted) {
      completedDate = new Date();
    }

    const alteredTask = { ...task, dtCompleted: completedDate };

    const updatedTask = await TaskService.updateTask(alteredTask);

    // Item was unchecked
    if (!updatedTask.dtCompleted) {
      // get task from storage
      // get newTask id from pending tasks
      // delete newTask
      const deletedResponse = await TaskService.deleteCreatedTask(
        updatedTask.id
      );

      if (deletedResponse) {
        console.log("deletedResponse: ", deletedResponse);

        const filteredList = tasks.filter(
          (task) => task.id !== deletedResponse.id
        );

        const filteredTasks = filteredList.filter(
          (task) => task.id !== updatedTask.id
        );
        const updatedList = [...filteredTasks, updatedTask];
        const sortedTasks = sortTasks(updatedList);
        setTasks(sortedTasks);
        return;
      }
      updateTasks(updatedTask);
      return;
    }
    // Item was checked

    // No rrule, update and done
    if (!updatedTask.rrule) {
      updateTasks(updatedTask);
      return;
    }

    // Rrule, add the future task
    const futureTask = getFutureTask(updatedTask);
    console.log("futureTask: ", futureTask);

    const newTask = await TaskService.addTask(futureTask);

    updateArrayOfTasks([updatedTask, newTask]);
    TaskService.saveToLocalStorage(updatedTask, newTask);

    // .catch((err) => {
    //   console.error(err);
    // });
  };
  // Uncomment for removing a tast
  // const removeTask = (taskId) => {
  //   const filteredList = tasks.filter((task) => task.id !== taskId);
  //   sortByDate(filteredList);
  //   setTasks(filteredList);
  // };

  const updateArrayOfTasks = (updateArrayOfTasks) => {
    const updatedTask = updateArrayOfTasks[0];
    const filteredTasks = tasks.filter((task) => task.id !== updatedTask.id);
    const updatedList = [...filteredTasks, ...updateArrayOfTasks];
    const sortedTasks = sortTasks(updatedList);
    setTasks(sortedTasks);
  };

  const updateTasks = (updatedTask) => {
    const filteredTasks = tasks.filter((task) => task.id !== updatedTask.id);
    const updatedList = [...filteredTasks, updatedTask];
    const sortedTasks = sortTasks(updatedList);
    setTasks(sortedTasks);
  };

  const updateTask = async (task) => {
    const updatedTask = await TaskService.updateTask(task);
    updateTasks(updatedTask);
  };

  return {
    tasks,
    setTasks,
    addToTaskList,
    handleCheckCompleted,
    updateTasks,
    updateArrayOfTasks,
    updateTask,
    addTask,
  };
}
