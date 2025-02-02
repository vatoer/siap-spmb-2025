import Select, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SelectProps<T = Option> {
  isDisabled?: boolean;
  inputId?: string;
  options?: T[];
  value?: string | SingleValue<T>;
  onChange?: (value: SingleValue<T>) => void;
}

export const SelectSingle = <T extends Option = Option>({
  isDisabled = false,
  inputId,
  options = [],
  value,
  onChange,
}: SelectProps<T>) => {
  //generate a random instanceId if not provided

  const instanceId = Math.random().toString(36).substring(7);

  // If value is a string, find the corresponding object in options
  const selectedValue =
    typeof value === "string"
      ? options.find((option) => option.value === value) || null
      : value;
  return (
    <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      inputId={inputId}
      isDisabled={isDisabled}
      instanceId={instanceId}
      options={options}
      value={selectedValue}
      onChange={onChange}
      isClearable={true}
    />
  );
};

export default SelectSingle;
