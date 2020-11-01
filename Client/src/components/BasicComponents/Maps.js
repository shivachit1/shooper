import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import mapStyles from '../../mapStyles.js';
import PlacesNearby from './PlacesNearby.js';
class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
            },
            locationPermission:false,
            newMarker:false,
            markers:''
        }
          this.placeMarkers=this.placeMarkers.bind(this);
       
      }

      getGeoLocation=() =>{
        console.log(this.props);
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position);
                this.setState(prevState => ({
                  currentLatLng: {
                      ...prevState.currentLatLng,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              }))
              },
              (error)=> {
                console.error("Error Code = " + error.code + " - " + error.message);
              }
            );
          }
      }

      placeMarkers=(ma)=>{
        
        this.setState({
            markers:ma
        });

        console.log(this.state.markers)
      }


      onMarkerDragEnd = (coord) => {
       
        console.log(coord);

        this.setState(prevState => ({
          currentLatLng: {
              ...prevState.currentLatLng,
              lat: coord.position.lat,
              lng:coord.position.lng
          }
      }))

        console.log(coord);
      };


      newMarkerForBusiness = () => {
        this.setState({
          newMarker:true
        })
      }
      
      componentDidMount() {
      
        this.getGeoLocation();
       
      }
    
    
    render() {
       
        return (
            <div className="map">
                <Map 
                minZoom={10}
                google={this.props.google} 
                styles={this.props.mapStyle} 
                disableDefaultUI={true}
                center={this.state.currentLatLng}
                >
                
                    <Marker
                        opacity={1}
                        title={'user position'}
                        markerWithLabel={window.MarkerWithLabel}
                        labelClass="user"
                        draggable={true}
                        labelContent={`<div>userLocation</div>`}
                        position={this.state.currentLatLng}
                        onDragend={( coord) => this.onMarkerDragEnd(coord)}/>



                </Map>
                <PlacesNearby placeMarkers={this.placeMarkers}/>

                
              
   
            </div>
        );
    }

}

Maps.defaultProps = mapStyles;
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCV3wz4Bj73YgF5FUP0PJupzqiXdw-djJA")
  })(Maps);

