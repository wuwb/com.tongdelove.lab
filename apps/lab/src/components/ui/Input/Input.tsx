import React, {
  useState,
  forwardRef,
  RefObject,
  useCallback,
  ChangeEvent,
  Component,
} from 'react';
import debounce from 'lodash/debounce';
import { usePercentValue } from '@/hooks/usePercentValue';
import useUpdateEffect from '@/hooks/useUpdateEffect';
import { ErrorMessage } from "../ErrorMessage";
import "./Input.module.scss";
import TextareaAutosize from 'react-textarea-autosize'

export const Input = (props: any) => {
  const {
    focus,
    handleOnChange,
    label,
    name,
    placeholderText,
    value,
    type,
    classNames,
  } = props;

  return (
    <div className={classNames}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholderText}
        value={value || ""}
        onChange={handleOnChange}
        autoFocus={focus}
      />
    </div>
  );
};

export const TextArea = (props: any) => (
  <div className="form-group">
    <label className="form-label">{props.label}</label>
    <textarea
      className="form-control"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleOnChange}
      placeholder={props.placeholder}
    />
  </div>
);

const styles =
  'w-full rounded-md text-primary px-4 py-2 text-primary bg-gray-1000 dark:bg-white dark:bg-opacity-5 bg-opacity-5 hover border-gray-200 dark:border-gray-700'

export function SimpleInput(props) {
  return <input className={styles} {...props} />
}

export function TextareaAutosizeWrap({ maxRows = 8, rows = 1, ...props }) {
  return (
    <TextareaAutosize
      maxRows={maxRows}
      rows={rows}
      className={`${styles} block`}
      {...props}
    />
  )
}

export function SimpleSelect(props) {
  return <select className={styles} {...props} />
}

export const Select = (props: any) => {
  return (
    <div>
      <label htmlFor={props.name}> {props.label} </label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option: any) => {
          return (
            <option key={option.id} value={option.id} label={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const CheckBox = (props: any) => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      <div className="checkbox-group">
        {props.options.map((option: any) => {
          return (
            <label key={option}>
              <input
                className="form-checkbox"
                id={props.name}
                name={props.name}
                onChange={props.handleChange}
                value={option}
                checked={props.selectedOptions.indexOf(option) > -1}
                type="checkbox"
              />{" "}
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

type InputTextProps = {
  focus: boolean;
  name: string;
  labelText: string;
  placeholderText: string;
  inputElement: any;
  getInputValue: any;
  type: any;
  errorMessage: any;
  presetValue: any;
};
type InputTextPropsState = {
  value: string;
  isValid: boolean;
}
export class InputText extends Component<InputTextProps, InputTextPropsState> {
  inputElement;

  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
    this.inputElement = React.createRef();
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(name, value);
    }
  };

  componentDidMount() {
    if (this.props.focus) {
      this.inputElement.current.focus();
    }
  }

  render() {
    const {
      focus,
      name,
      labelText,
      placeholderText,
      type,
      errorMessage,
      presetValue,
    } = this.props;

    return (
      <div>
        <label htmlFor={name}>{labelText}</label>
        <input
          ref={this.inputElement}
          name={name}
          type={type}
          placeholder={placeholderText}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
          autoFocus={focus}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }


}

export class InputEmail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(value);
    }
  };

  render() {
    const { name, labelText, placeholderText, errorMessage } = this.props;

    return (
      <div>
        <label htmlFor={name}>{labelText}</label>
        <input
          name={name}
          type="text"
          placeholder={placeholderText}
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  // type propTypes = {
  //   name: string;
  //   labelText: string;
  //   placeholderText: string;
  // };
}

export class InputPassword extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { name, labelText, placeholderText, errorMessage } = this.props;

    return (
      <div>
        <label htmlFor={name}>{labelText}</label>
        <input
          name={name}
          type="password"
          placeholder={placeholderText}
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  // type propTypes = {
  //   name: string;
  //   labelText: string;
  //   placeholderText: string;
  // };
}

export class InputTextArea extends Component<any, any> {
  inputElement;
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
    this.inputElement = React.createRef();
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(name, value);
    }
  };

  componentDidMount() {
    if (this.props.focus) {
      this.inputElement.current?.focus();
    }
  }

  render() {
    const {
      focus,
      name,
      labelText,
      placeholderText,
      type,
      errorMessage,
      presetValue,
    } = this.props;

    return (
      <div>
        <label htmlFor={name}>{labelText}</label>
        <textarea
          ref={this.inputElement}
          name={name}
          placeholder={placeholderText}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
          onFocus={focus}
        />
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  // type propTypes = {
  //   name: string;
  //   labelText: string;
  //   placeholderText: string;
  // };
}

export class InputSelect extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      isValid: true,
    };
  }

  handleOnChange = (event: any) => {
    const value = event.target.value;
    this.setState({ value: value });
    if (this.state.isValid) {
      this.props.getInputValue(this.props.name, value);
    }
  };

  render() {
    const { name, labelText, options, errorMessage, required, presetValue } =
      this.props;

    return (
      <div>
        <label htmlFor={name}>{labelText}</label>
        <select
          name={name}
          required={required}
          value={presetValue ? presetValue : this.state.value}
          onChange={this.handleOnChange}
        >
          {!presetValue && (
            <option value="" className="placeholder">
              Select...
            </option>
          )}

          {options &&
            options.map((option: any) => (
              <option key={option.id} value={option.id}>
                {`${option.name}
										${option.description ? "(" + option.description + ")" : ""}`}
              </option>
            ))}
        </select>
        {!this.state.isValid && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }

  // type propTypes = {
  //   name: string;
  //   labelText: string;
  //   placeholderText: string;
  // };
}

type InputCheckProps = {
  name: string;
  labelText: string;
  placeholderText: string;
  getInputValue: any;
  presetValue: any;
};

export class InputCheck extends Component<InputCheckProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleOnChange = (event) => {
    const checked = event.target.checked;
    this.setState({ checked: checked });
    this.props.getInputValue(this.props.name, checked);
  };

  render() {
    const { name, labelText, presetValue } = this.props;

    return (
      <div className="input-check__container">
        <input
          name={name}
          type="checkbox"
          checked={presetValue ? presetValue : this.state.checked}
          onChange={this.handleOnChange}
        />
        <label htmlFor={name} className="input-check__label">
          {labelText}
        </label>
      </div>
    );
  }
}

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type RequiredInputProps = Required<Pick<InputHTMLAttributes, 'value'>>;
export type OptionalInputProps = Pick<
  InputHTMLAttributes,
  'type' | 'placeholder' | 'readOnly' | 'onBlur' | 'onFocus' | 'id'
>;
type IOnStringChange = (value: string) => void;
type IOnNumberChange = (value: number) => void;
type OptionalRefProps = {
  forwardedRef?: RefObject<HTMLInputElement>;
};
type BaseInputProps = RequiredInputProps &
  OptionalInputProps &
  OptionalRefProps;

function BaseInput({
  value,
  onChange,
  pattern,
  forwardedRef,
  ...rest
}: BaseInputProps & { onChange: IOnStringChange; pattern: RegExp }) {
  const [state, setState] = useState(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce<IOnStringChange>(onChange, 300),
    []
  );
  const callback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setState(v);
      if (pattern && pattern.test(v)) {
        debouncedChange(v);
      }
    },
    [debouncedChange, pattern]
  );

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <input
      {...rest}
      ref={forwardedRef}
      type="text"
      value={state}
      onChange={callback}
    />
  );
}

type NumberInputProps = BaseInputProps & { onChange: IOnNumberChange };
type PercentInputProps = NumberInputProps;

const patterns = {
  number: /\d+/,
  text: /[\d\w]*/
};

export function NumberInput({ value, onChange, ...rest }: NumberInputProps) {
  const callback = useCallback(
    (value: string) => {
      onChange(+value);
    },
    [onChange]
  );
  return (
    <BaseInput
      {...rest}
      value={value}
      onChange={callback}
      pattern={patterns.number}
    />
  );
}

export function PercentInput({ value, onChange, ...rest }: PercentInputProps) {
  const [rawValue, percentValue, setPercentValue] = usePercentValue(
    value as number
  );
  const callback = useCallback(
    (v: string) => {
      setPercentValue(+v);
    },
    [setPercentValue]
  );

  useUpdateEffect(() => {
    onChange(rawValue);
  }, [rawValue]);

  return (
    <BaseInput
      {...rest}
      value={percentValue}
      onChange={callback}
      pattern={patterns.number}
    />
  );
}

export type TextInputProps = BaseInputProps & {
  onChange: IOnStringChange;
};

export function TextInput(props: TextInputProps) {
  return <BaseInput {...props} pattern={patterns.text} />;
}

export const ForwardedTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <TextInput {...props} forwardedRef={ref as RefObject<HTMLInputElement>} />
    );
  }
);

ForwardedTextInput.displayName = 'ForwardedTextInput';
