import { useState } from "react";

import Fields from "./TaskFormFields";

import Button from "components/common/Button";
import Form from "components/common/Form";

export default function AddEditTask({
  closeModal,
  foreignId,
  defaultTask = {
    task: "",
    description: "",
    dtStart: new Date(),
    foreignId: foreignId,
  },
  updateTask,
  addTask,
  mode = "add",
}) {
  const [dirty, setDirty] = useState(false);
  const [task, setTask] = useState({ ...defaultTask });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      updateTask(task);
    } else {
      addTask(task);
    }

    closeModal();
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setTask({ ...task, [name]: value });

    if (!dirty) {
      setDirty(true);
    }
  };

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setTask({ ...task, dtStart: date });
    if (!dirty) {
      setDirty(true);
    }
    return;
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      name={mode === "add" ? "addtask" : "edittask"}
    >
      <Form.Header title={mode === "add" ? "add task" : "edit task"} />
      <Form.Body>{Fields(task, handleChange, handleDateChange)}</Form.Body>
      <Form.Footer>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit" disabled={!dirty}>
          Save
        </Button>
      </Form.Footer>
    </Form>
  );
}
