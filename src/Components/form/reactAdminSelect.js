import { Form } from 'react-bootstrap';
import Select from 'react-select';
import React from 'react';
const ReactAdminSelectBox = (props) => {
    const { placeholder, value, error, isSearchable, required, options, label, isClearable, isLoading, className, onInputChange, isDisabled, onBlur, classNames, styles } = props;

    const [selected, setSelected] = React.useState('');

    React.useEffect(() => {
        if (value) {
            const selected = options.find((e) => e.value == value);
            setSelected(selected);
        } else if (isClearable) {
            setSelected('')
        }
    }, [options, value]);

    return (
        <>
            <Form.Group style={{ width: '100%' }}>
                {label && <Form.Label className={className}> {label} </Form.Label>}
                <Select
                    className={classNames}
                    options={options}
                    required={required}
                    isClearable={isClearable}
                    onInputChange={onInputChange}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    isSearchable={isSearchable}
                    onBlur={onBlur}
                    styles={styles}
                    value={selected}
                    validate={props.validate}
                    placeholder={placeholder}
                    onChange={(e) => props.onChange(e)}
                    isInvalid={error}
                />
                {error && <Form.Text style={{ color: '#dc3545', fontSize: "13px" }} type="invalid">
                    {error}
                </Form.Text>}
            </Form.Group>
        </>
    );
};
export default ReactAdminSelectBox;
