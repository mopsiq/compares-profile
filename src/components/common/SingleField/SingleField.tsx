import { Input } from "@hope-ui/solid";
import { Component, createSignal } from "solid-js";

interface SingleFieldProps {
  validation: (value: string) => boolean;
  innerValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const SingleField: Component<SingleFieldProps> = ({
  innerValue,
  placeholder,
  validation,
  onChange,
}) => {
  const [value, setValue] = createSignal<string>(innerValue || "");
  const [isInvalid, setIsInvalid] = createSignal<boolean>(false);
  const handleSingleField = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setValue(inputValue);
    setIsInvalid(!validation?.(inputValue));
    onChange?.(inputValue);
  };

  return (
    <Input
      onInput={handleSingleField}
      invalid={isInvalid()}
      placeholder={placeholder}
      value={value()}
    />
  );
};
