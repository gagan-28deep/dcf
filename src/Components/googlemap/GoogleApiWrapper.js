import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import http from "../../Config/HTTP_request";
import { apiAdminConfig } from "../../utils/api";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100vh",
};

export class MapContainer extends React.Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    posts: [],
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  componentDidMount() {
    const fetchdata = async () => {
      await apiAdminConfig
        .get(`asset`)
        .then((response) => {
          let apidata = response.data.data;
          console.log("apidata", apidata[0]);
          this.setState({ posts: apidata });
        })
        .catch((error) => console.log("error", error));
    };
    fetchdata();
  }
  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    let { posts } = this.state;
    console.log(posts[0]);
    return (
      <Map
        containerStyle={containerStyle}
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: "100vh", position: "relative", width: "100%" }}
        zoom={5}
        initialCenter={{
          lat: 28.670845,
          lng: 77.1276685,
        }}
      >
        {posts.map((el, id) => {
          return (
            <Marker
              name={el.clinicName}
              state={el.state}
              city={el.city}
              pincode={el.pincode}
              onClick={this.onMarkerClick}
              position={{
                lat: el.coords.coordinates[0],
                lng: el.coords.coordinates[1],
              }}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h6>{this.state.selectedPlace.name}</h6>
            <p>
              {this.state.selectedPlace.state}, {this.state.selectedPlace.city}{" "}
              ({this.state.selectedPlace.pincode})
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRIXnGqInWHUFBIS37oFFh7tcqTf0z52Q",
  version: "3.38",
})(MapContainer);
