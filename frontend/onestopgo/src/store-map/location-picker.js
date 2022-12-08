import {GoogleApiWrapper, Map} from 'google-maps-react';

const LocationPicker = ({google, clickFunction}) => {
    return (
        <div className="row w-75 h-50">
            <Map
                google={google}
                zoom={6}
                style={
                    {
                        width: '50%',
                        height: '25%',
                    }
                }
                initialCenter={{lat: 42.320774, lng: -71.079676}}
                onClick={clickFunction}
            >
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(LocationPicker);