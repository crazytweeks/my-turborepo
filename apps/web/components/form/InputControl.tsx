import { InputHTMLAttributes } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { CTextField } from "../custom/CTextField";

const ConvertCamelCaseToSentence = (str: string) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

function ControlInput<T extends FieldValues>({
  control,
  name,
  label,
  type,
  required,
}: {
  control: Control<
    T,
    {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? Control<T[K]>
        : Control<T[K]>;
    }
  >;
  name: FieldPath<T>;
  label?: string;
  type?: InputHTMLAttributes<unknown>["type"];
  required?: boolean;
}) {
  const {
    field,
    fieldState: { invalid, isDirty, error },
  } = useController<T, FieldPath<T>>({
    name,
    control,
  });

  return (
    <CTextField
      {...field}
      error={!!error}
      type={type}
      required={required}
      color={invalid ? "error" : isDirty ? "warning" : "primary"}
      helperText={error?.message}
      label={label ?? ConvertCamelCaseToSentence(name)}
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
    />
  );
}

export default ControlInput;
