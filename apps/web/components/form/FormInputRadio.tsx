import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

const options = [
  {
    label: "Radio Option 1",
    value: "1",
  },
  {
    label: "Radio Option 2",
    value: "2",
  },
];

const FormInputRadio: React.FC<FormInputProps> = ({ name, control, label }) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, i) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
        key={i}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default FormInputRadio;
