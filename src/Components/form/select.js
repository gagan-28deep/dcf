import { FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormControl } from "./index";
const SelectBox = props => {
  const {
    name,
    label,
    value,
    required,
    color,
    options,
    fullWidth,
    helperText,
    margin,
    disabled,
    sx
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={sx}
    >

      <TextField
        sx={{ textAlign: 'left' }}
        label={label}
        margin={margin}
        disabled={disabled}
        name={name}
        required={required}
        value={value}
        color={color}
        select={true}
        onChange={e => props.onChange(e)}
        inputProps={{
          name: name
        }}
      >
        {options &&
          options.map(option => {
            return (
              <MenuItem key={option.value ? option.value : option} value={option.value ? option.value : option}>
                {option.label ? option.label : option.clinicName}
              </MenuItem>
            );
          })}
      </TextField>

      {helperText &&
        <FormHelperText>
          {helperText}
        </FormHelperText>}
    </FormControl>
  );
};
export default SelectBox;
