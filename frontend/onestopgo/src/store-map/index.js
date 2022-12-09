import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

const StoreMap = ({google, storeArray}) => {
    return (
        <div className="row w-75">
            <div className="col-8 center">
                <div className="row fw-bolder text-center">
                    Our Locations
                </div>
                <div className="row w-75 h-75">
                    <Map
                        google={google}
                        zoom={6}
                        style={
                            {
                                width: '75%',
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
            </div>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(StoreMap);