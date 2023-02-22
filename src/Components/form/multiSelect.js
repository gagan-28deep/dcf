import { FormHelperText } from "@mui/material";
import { FormControl } from "./index";
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Form } from "react-bootstrap";
const MultiSelectBox = props => {
    const animatedComponents = makeAnimated();
    const {
        name,
        label,
        value,
        required,
        color,
        options,
        margin,
        disabled,
        isMulti,
        closeMenuOnSelect,
        classNames,
        error
    } = props;

    const customStyles = {
        control: (provided) => ({
            ...provided,
            textAlign: "left",
        }),
        menu: (provided) => ({
            ...provided,
            textAlign: "left",
        }),
    };

    return (
        <Form.Group className="mb-0 mt-0 text-left">
            {label && <Form.Label style={{ textAlign: "left" }} className={classNames}> {label} </Form.Label>}
            <Select
                styles={customStyles}
                label={label}
                margin={margin}
                disabled={disabled}
                className="text-left"
                name={name}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                required={required}
                components={animatedComponents}
                value={value}
                color={color}
                getOptionLabel={props.getOptionLabel}
                getOptionValue={props.getOptionValue}
                select={true}
                onChange={e => props.onChange(e)}
                options={options}
                isInvalid={error}
            />
            {error && <Form.Text className="text-danger" type="invalid">
                {error}
            </Form.Text>}
        </Form.Group>
    );
};
export default MultiSelectBox;
