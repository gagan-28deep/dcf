import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Form from "react-bootstrap/Form";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        latLng["location"] = address;
        this.props.getCord(latLng);
      })
      .catch((error) => console.error("Error", error));
    this.setState({ address: address });

    geocodeByAddress(address).then((results) => {
      let newObj = {};
      const place = results[0].address_components;
      console.log("place", place);
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
      newObj["route"] = place.find((e) => e.types.includes("landmark"))
        ? place.find((e) => e.types.includes("landmark")).long_name +
        ", " +
        place?.find((e) => e.types.includes("sublocality_level_2"))
          .long_name +
        ", " +
        place?.find((e) => e.types.includes("sublocality_level_1")).long_name
        : "";
      this.props.getlocation(newObj);
    });
  };
  componentDidMount() {
    if (this.props.location) {
      this.setState({ address: this.props.location });
      this.props.getCord({
        lat: this.props.coordinate.coordinates[0],
        lng: this.props.coordinate.coordinates[1],
      });
    }
  }
  render() {
    console.log('this.state', this.state)

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Form.Control
              type="text"
              {...getInputProps({
                placeholder: "Search Location",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, id) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={id}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
