import { useState } from "react";
import TaskService from "services/TaskService";

import styles from "./rrule.module.css";

function parseRRule(rruleString) {
  return rruleString
    .split(";")
    .map((keyValue) => {
      return keyValue.split("=");
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue[0]] = currentValue[1];
      return accumulator;
    }, {});
}

export default function RRule({ task }) {
  //  These functions are declared at the top
  //  to set the initial state of the rrule {}

  const setInitialState = (task) => {
    if (!task.rrule) return { FREQ: "NONE", INTERVAL: "" };
    return parseRRule(task.rrule.rule);
  };

  const [rrule, setRRule] = useState(setInitialState(task));
  const frequencyOptions = ["daily", "weekly", "monthly", "yearly"];

  // const setRRule = () => {};

  const handleRRuleChange = (e) => {
    const target = e.target;
    if (target.type === "radio") {
      setRRule({ ...rrule, FREQ: target.value.toUpperCase() });
      e.target.checked = true;
    }
    if (target.type === "number") {
      setRRule({ ...rrule, INTERVAL: parseInt(target.value) });
    }
  };

  const setTaskRule = () => {
    task.rrule = {
      rule: `FREQ=${rrule.FREQ};INTERVAL=${rrule.INTERVAL}`,
    };
    console.log("task.rrule: ", task.rrule);
  };

  const removeRecurrence = async () => {
    console.log("removeRecurrence");
    const response = await TaskService.deleteRrule(task.id);
    if (response) {
      console.log("response: ", response);
      delete task.rrule;
    }
  };

  return (
    <div className={styles.rrule}>
      <section className={styles.recurrence}>
        <p>Recurrence</p>
        <div className={styles.radioGroup}>
          {frequencyOptions.map((option, i) => (
            <label className={styles.item} key={i}>
              <input
                type="radio"
                name="recurrence-type"
                value={option}
                onChange={handleRRuleChange}
                defaultChecked={rrule?.FREQ === option.toUpperCase()}
              />
              {option}
            </label>
          ))}
        </div>
        <div className={styles.numberOf}>
          <label>
            Recur every
            <input
              type="number"
              name="number-of"
              value={rrule?.INTERVAL}
              onChange={handleRRuleChange}
              min="0"
            />
            <span>
              {/* {scope} */}
              {/* {numberOf === 1 ? "" : "s"} */}
            </span>
          </label>
          <button type="button" onClick={setTaskRule}>
            Set Recurrence
          </button>
          <button type="button" onClick={removeRecurrence}>
            Remove Recurrence
          </button>
        </div>
      </section>
    </div>
  );
}

RRule.parseRRule = parseRRule;
