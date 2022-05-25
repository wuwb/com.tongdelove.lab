import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AddEditTask from "../AddEditTask";
import DateDisplay from "components/common/datetime/DateDisplay";

import Toolbar from "components/common/Toolbar";
import ToolbarButton from "components/common/Button/ToolbarButton";
import Modal from "components/common/Modal";

import styles from "./task_list.module.css";

function TaskDetails({ task }) {
  const handleShowDetailsClick = (e) => {
    const details = e.currentTarget.nextSibling;
    if (details.firstChild.textContent.length > 0) {
      details.classList.toggle(styles["show"]);
    }
  };

  return (
    <>
      <div
        className={styles.more}
        onClick={handleShowDetailsClick}
        title="Show details"
      >
        <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
      </div>
      <div
        className={styles.task__details}
        onClick={(e) => e.currentTarget.classList.toggle(styles["show"])}
      >
        <h6 className={styles.details__header}>{task.task}</h6>
        <p className={styles.description}>{task.description}</p>
      </div>
    </>
  );
}

function HasRecurrence({ task }) {
  return (
    <p className={styles.hasRecurrence}>
      <span title="Recurring" className={task.rrule?.rule ? styles.show : ""}>
        <FontAwesomeIcon icon={["fas", "sync-alt"]} />
      </span>
    </p>
  );
}

export default function TaskList({
  tasks,
  updateTasks,
  handleCheckCompleted,
  updateTask,
}) {
  const [selectedTask, setSelectedTask] = useState();
  const modal = useRef(null);

  const handleEditTaskClick = (e) => {
    modal.current.open();
    // Targets the input id
    const id = e.currentTarget.parentElement.previousSibling.firstChild.id;
    const task = tasks.filter((task) => task.id === id)[0];

    setSelectedTask(task);
  };

  return (
    <>
      <ul className={styles.task__list}>
        {tasks.map((task) => {
          return (
            <li key={task.id} data-id={task.id}>
              <section className={styles.topbar}>
                <DateDisplay>{task.dtStart}</DateDisplay>
                <HasRecurrence task={task} />
              </section>
              <section className={styles.taskInfo}>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name={task.id}
                    id={task.id}
                    onChange={() => handleCheckCompleted(task)}
                    checked={task.dtCompleted !== null ? true : false}
                  />
                  <label
                    // className={styles.checkbox}
                    htmlFor={task.id}
                    title="Check to complete"
                    // className={task.dtCompleted ? styles.strike : styles.task}
                  >
                    {task.task}
                  </label>
                </div>
                <Toolbar>
                  <ToolbarButton onClick={handleEditTaskClick}>
                    <FontAwesomeIcon icon={["fas", "edit"]} />
                  </ToolbarButton>
                </Toolbar>
                <TaskDetails task={task} />
              </section>
            </li>
          );
        })}
      </ul>
      <Modal ref={modal} fade={true}>
        <AddEditTask
          closeModal={() => modal.current.close()}
          defaultTask={selectedTask}
          updateTasks={updateTasks}
          updateTask={updateTask}
          mode="edit"
        />
      </Modal>
    </>
  );
}
