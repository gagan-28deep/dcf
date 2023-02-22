import { FormHelperText, Icon, InputAdornment, TextField } from "@mui/material";
import { FormControl } from "./index";

const TextBox = props => {
  const {
    name,
    label,
    variant,
    type,
    icon,
    value,
    required,
    margin,
    color,
    multiline,
    inputAdornmentPosition,
    fullWidth,
    helperText,
    InputLabelProps,
    disabled,
    rows,
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
        error={helperText ? true : false}
        variant={variant}
        margin={margin}
        name={name}
        color={color}
        label={label}
        type={type}
        rows={rows}
        InputLabelProps={InputLabelProps}
        multiline={multiline}
        required={required}
        disabled={disabled}
        autoComplete={false}
        value={value}
        onChange={e => props.onChange(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position={inputAdornmentPosition}>
              <Icon>
                {icon}
              </Icon>
            </InputAdornment>
          )
        }}
      />

      {helperText &&
        <FormHelperText>
          {helperText}
        </FormHelperText>}
    </FormControl>
  );
};

export default TextBox;
