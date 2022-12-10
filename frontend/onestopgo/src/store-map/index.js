import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

const StoreMap = ({google, storeArray}) => {
    return (
        <center>
        <div className="container col-12 center">

            <span className="row fw-bolder text-center">
                Our Stores are Located at:
            </span>
                <Map
                    google={google}
                    zoom={6}
                    style={
                        {
                            width: '90%',
                            height: '35%',
                        }
                    }
                    initialCenter={{lat: 42.320774, lng: -71.079676}}
                >
                    {
                        storeArray.map((eachStore) => {
                            return <Marker position={{
                                lat: parseFloat(eachStore.location.split(" ")[0]),
                                lng: parseFloat(eachStore.location.split(" ")[1])
                            }} onClick={() => alert("That is " + eachStore.name)}/>
                        })
                    }
                </Map>
        </div>
        </center>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(StoreMap);