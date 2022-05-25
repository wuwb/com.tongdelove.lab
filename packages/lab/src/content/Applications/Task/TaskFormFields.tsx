import DatePicker from "react-datepicker";
import RRule from "./RRule";

export default function Fields(task, handleChange, handleDateChange) {
  return (
    <>
      <label>
        task
        <input
          name="task"
          type="text"
          value={task.task}
          onChange={handleChange}
        />
      </label>
      <label>
        description
        <textarea
          id="description"
          name="description"
          rows="5"
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>start date</label>
      <DatePicker
        selected={new Date(task.dtStart)}
        onChange={(date) => handleDateChange(date)}
        shouldCloseOnSelect={true}
      />
      <RRule task={task} />
    </>
  );
}
