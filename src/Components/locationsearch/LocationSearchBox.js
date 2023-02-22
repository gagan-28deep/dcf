import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
// import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

export const LocationSearchBox = (props) => {

    const [state, setState] = useState({
        address: ""
    });

    const handleChange = (address) => {
        console.log('addressaddress', address)
        setState({ address: address });
    };
    console.log('addressaddress', state)

    const handleSelect = (address) => {
        console.log('addressaddress', address)
        setState({ address: address });
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                latLng["location"] = address;
                props.getCord(latLng);
            })
            .catch((error) => console.error("Error", error));

        geocodeByAddress(address).then((results) => {
            let newObj = {};
            const place = results[0].address_components;
            newObj["postalCode"] = place.find((e) => e.types.includes("postal_code"))
                ? place.find((e) => e.types.includes("postal_code")).long_name
                : "";
            newObj["city"] = place.find((e) => e.types.includes("locality"))
                ? place.find((e) => e.types.includes("locality")).long_name
                : "";
            newObj["state"] = place.find((e) =>
                e.types.includes("administrative_area_level_1")
            )
                ? place.find((e) => e.types.includes("administrative_area_level_1"))
                    .long_name
                : "";
            props.getlocation(newObj);
        });
    };

    useEffect(() => {
        if (props.location) {
            setState({ address: props.location });
            props.getCord({
                lat: props.coordinate.coordinates[0],
                lng: props.coordinate.coordinates[1],
            });
        }
    }, [props.location])

    const OptionData = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => {
        const getOptions = () => {
            let getOptions = []
            suggestions.map((suggestion) => {
                getOptions.push({
                    label: suggestion.description,
                    value: suggestion.description
                })
            })

            return getOptions

        }
        return (
            <div className="autocomplete-root">
                <Autocomplete
                    disablePortal
                    options={getOptions()}
                    onChange={(e, value) => {
                        handleSelect(value.value)
                    }}
                    renderInput={(params) =>
                        <TextField {...getInputProps()} {...params} label="Location" />}
                />
            </div>
        )
    };

    return (
        <PlacesAutocomplete
            value={state.address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {OptionData}
        </PlacesAutocomplete>
    );

}