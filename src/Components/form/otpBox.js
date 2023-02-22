import { FormHelperText, Icon, InputAdornment, TextField } from "@mui/material";
import { FormControl } from "./index";
import OtpInput from 'react-otp-input';

const OTPBox = props => {
    const {
        numInputs,
        isInputNum,
        shouldAutoFocus,
        focusStyle,
        errorStyle,
        separator,
        inputStyle,
        containerStyle,
        value,
        hasErrored
    } = props;

    return (
        <>
            <OtpInput
                hasErrored={hasErrored ? true : false}
                value={value}
                onChange={e => props.onChange(e)}
                numInputs={numInputs}
                isInputNum={isInputNum}
                shouldAutoFocus={shouldAutoFocus}
                focusStyle={focusStyle}
                errorStyle={errorStyle}
                separator={separator}
                inputStyle={inputStyle}
                containerStyle={containerStyle}
            />
            {hasErrored &&
                <FormHelperText sx={{ marginLeft: '7px', color:'rgb(211, 47, 47)' }}>
                    {hasErrored}
                </FormHelperText>}
        </>
    );
};

export default OTPBox;
