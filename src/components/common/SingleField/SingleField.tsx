import { Input } from "@hope-ui/solid";
import { Component, createSignal } from "solid-js";

interface SingleFieldProps {
  innerValue?: string;
  placeholder?: string;
  validation?: (value: string) => boolean;
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
  const handleSingleField = (e: any) => {
    setValue(e.target.value);

    if (validation?.(value())) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    onChange?.(value());
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
