import React from 'react';


// const Select = styled.select`
//   line-height: 1em;
//   background-color: transparent;
//   border-style: none;
// `;

import ToggleOption from '../ToggleOption';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} />
    ));
  }

  return (
    <select value={props.value} onChange={props.onToggle}>
      {content}
    </select>
  );
}

export default Toggle;
