import { Form } from 'react-bootstrap';
import Select from 'react-select';
import React from 'react';
const ReactSelectBox = (props) => {
    const { placeholder, value, error, isSearchable, required, options, label, isClearable, isLoading, className, onInputChange, isDisabled, onBlur, classNames } = props;

    const [selected, setSelected] = React.useState('');

    React.useEffect(() => {
        if (value) {
            const selected = options.find((e) => e.value == value);
            setSelected(selected);
        } else if (isClearable) {
            setSelected('')
        }
    }, [options, value]);

    const customStyles = {
        control: () => ({
            // none of react-select's styles are passed to <Control />
            border: '0px',
            cursor: 'text',
            width: '100%'
        }),
        indicatorSeparator: () => ({
            // none of react-select's styles are passed to <indicatorSeparator />
            border: '0px',
            display: 'none'
        }),
        indicatorsContainer: () => ({
            // none of react-select's styles are passed to <indicatorsContainer />
            border: '0px',
            display: 'none'
        }),
        container: (provided, state) => ({
            // none of react-select's styles are passed to <indicatorsContainer />
            ...provided,
            width: "100%",
            background: '#fff'
        }),
        menu: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
        }),
        input: (provided, state) => ({
            ...provided,
            width: '100px',
            height: '100%',
            padding: '4px',
            paddingLeft: '0px'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            textAlign: 'left',
            height: '100%',
            display: 'flex',
            width: 'max-content',
            position: 'absolute',
            flexWrap: 'nowrap',
            overFlow: 'hidden',
            alignItems: 'center'

        })
    }

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
                    styles={customStyles}
                    value={selected}
                    validate={props.validate}
                    placeholder={placeholder}
                    onChange={(e) => props.onChange(e)}
                    isInvalid={error}
                />
                {error && <Form.Text style={{ color: '#dc3545' }} type="invalid">
                    {error}
                </Form.Text>}
            </Form.Group>
        </>
    );
};
export default ReactSelectBox;
