import { FormControlLabel, FormHelperText, Icon, InputAdornment, Switch, TextField } from "@mui/material";
import { FormControl } from "./index";

const ToggleBox = props => {
  const {
    name,
    label,
    variant,
    value,
    required,
    fullWidth,
    helperText,
    disabled
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
    >

      <FormControlLabel
        control={
          <Switch
            required={required}
            disabled={disabled}
            color={variant}
            checked={value ? true : false}
            onChange={e => props.onChange(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label={label}
      />

      {helperText &&
        <FormHelperText>
          {helperText}
        </FormHelperText>}
    </FormControl>
  );
};

export default ToggleBox;
