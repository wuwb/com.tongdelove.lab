import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

import useTask from "./useTask";

import AddEditTask from "./AddEditTask";
import Modal from "components/common/Modal";
import TaskList from "./TaskList";
import Toolbar from "components/common/Toolbar";
import ToolbarButton from "components/common/Button/ToolbarButton";

import styles from "./task.module.css";

function TaskHeader({ modal }) {
  return (
    <header>
      <h3>Tasks</h3>
      <Toolbar>
        <ToolbarButton onClick={() => modal.current.open()}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </ToolbarButton>
      </Toolbar>
    </header>
  );
}
export default function Task({ foreignId }) {
  const { tasks, addTask, handleCheckCompleted, updateTasks, updateTask } =
    useTask(foreignId);
  const modal = useRef(null);

  return (
    <div className={styles.task}>
      <TaskHeader modal={modal} />
      <TaskList
        tasks={tasks}
        updateTasks={updateTasks}
        updateTask={updateTask}
        handleCheckCompleted={handleCheckCompleted}
      />
      <Modal ref={modal} fade={true}>
        <AddEditTask
          foreignId={foreignId}
          closeModal={() => modal.current.close()}
          addTask={addTask}
        />
      </Modal>
    </div>
  );
}
