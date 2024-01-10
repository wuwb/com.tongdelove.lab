const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

export default ToggleOption;
