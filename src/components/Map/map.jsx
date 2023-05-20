import React, { useState } from 'react';
import StoreCard from '../storeCard/storeCard.jsx'
import marker from './marker.png'
import Loading from '../loading/loading.jsx'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


import './map.css'



const GoogleMap = (props) => {





    const [selectedStore, setSelectedStore] = useState({});
    const [showItems, setShowItems] = useState(false);
    const [alert, setAlert] = useState({ display: false, msg: "" })
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onMarkerClick = (props) => {
        setSelectedStore(props.store)
        setShowItems(true)
    }



    const onItemsClose = () => {
        setShowItems(false)
        setSelectedStore({});
        setAlert({ display: false, msg: "" })
        setUpdateLoading(false)
        setDeleteLoading(false)
    }

    const handleInputChange = (e) => {
        setSelectedStore({ ...selectedStore, [e.target.name]: e.target.value })
    }

    const handleItemChange = (prop, event, index) => {
        const old = selectedStore.items[index];
        const updated = { ...old, [prop]: event.target.value }
        const clone = [...selectedStore.items];
        clone[index] = updated;
        setSelectedStore({ ...selectedStore, items: clone })
    }



    const addItem = () => {
        const newItem = { name: "", quantity: "", price: "" };
        setSelectedStore({ ...selectedStore, items: selectedStore.items.concat(newItem) })
    }

    const deleteItem = (i) => {
        setSelectedStore({ ...selectedStore, items: selectedStore.items.filter((item, index) => index !== i) })
    }


    const deleteStore = () => {
        setAlert({ display: false, msg: "" })
        setDeleteLoading(true)
        fetch('https://covid-19-shopping.herokuapp.com/deletestore', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedStore)
        })
            .then(response => response.json())
            .then(res => {
                if (Array.isArray(res)) {
                    props.handleStoreChange(res)
                    setDeleteLoading(false)
                    setShowItems(false)
                } else {
                    console.log("Bad response from server")
                    setAlert({ display: true, msg: res })
                    setDeleteLoading(false)
                }
            })
            .catch(() => {
                setAlert({ display: true, msg: "could not get a response from the server" })
                setDeleteLoading(false)
            })
    }


    const isStoreValid = selectedStore.name && selectedStore.type && selectedStore.items.every(i => Object.values(i).every(v => v)) && selectedStore.items.length > 0;

    const onStoreEdit = () => {
        setAlert({ display: false, msg: "" })
        if (isStoreValid) {
            setUpdateLoading(true)
            fetch('https://covid-19-shopping.herokuapp.com/editstore', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedStore)
            }).then(response => response.json())
                .then(res => {
                    if (Array.isArray(res)) {
                        props.handleStoreChange(res)
                        setShowItems(false)
                        setUpdateLoading(false)
                    } else {
                        setAlert({ display: true, msg: res })
                        setUpdateLoading(false)
                    }
                })
                .catch(() => {
                    setAlert({ display: true, msg: "could not get a response from the server" })
                    setUpdateLoading(false)
                })
        } else {
            setAlert({ display: true, msg: "Please fill all the empty inputs before updating" })
        }

    }



    const mapStyles = {
        width: '100vw',
        height: 'calc(100vh - 60px)',
    };


    return (
        <>
            <div className="map-out-div">
                <Map
                    className="map-wrapper"
                    google={props.google}
                    onClick={props.mapClick}
                    zoom={13}
                    minZoom={3}
                    style={mapStyles}
                    initialCenter={{ lat: -1.268410, lng: 36.871947 }}
                    styles = {
                        [
                            {
                                "featureType": "all",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    }
                                ]
                            },
                            {
                                "featureType": "all",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    },
                                    {
                                        "lightness": 13
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#144b53"
                                    },
                                    {
                                        "lightness": 14
                                    },
                                    {
                                        "weight": 1.4
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "weight": "2.62"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "labels.text",
                                "stylers": [
                                    {
                                        "color": "#ff0000"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#ff0000"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#e21111"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#00ffa7"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.locality",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.locality",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.neighborhood",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "color": "#020808"
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "visibility": "off"
                                    },
                                    {
                                        "lightness": "-1"
                                    },
                                    {
                                        "gamma": "1.08"
                                    },
                                    {
                                        "saturation": "1"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "weight": "1.00"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#0b434f"
                                    },
                                    {
                                        "lightness": 25
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "weight": "1.00"
                                    },
                                    {
                                        "invert_lightness": true
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry.stroke",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "lightness": 16
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#5ce1e6"
                                    },
                                    {
                                        "invert_lightness": true
                                    },
                                    {
                                        "weight": "1.00"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "color": "#146474"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#000000"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "color": "#021019"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            }
                        ]
                    }
                >
                    {JSON.stringify(props.currentStore) !== '{}' && <Marker position={props.currentStore.coords} />}

                    {props.stores.map((store, i) => {
                        return (
                            <Marker icon={{ url: marker, scaledSize: new props.google.maps.Size(50, 40) }} key={i} user={props.user} store={store} position={store.coords} onClick={(props) => onMarkerClick(props)} />
                        )
                    })}

                    {showItems && <StoreCard updateLoading={updateLoading} deleteLoading={deleteLoading} alert={alert} deleteStore={deleteStore} onStoreEdit={onStoreEdit} deleteItem={deleteItem} addItem={addItem} handleItemChange={handleItemChange} handleChange={handleInputChange} onItemsClose={onItemsClose} store={selectedStore} user={props.user} />
                    }
                </Map>

            </div>

            {showItems && <StoreCard updateLoading={updateLoading} deleteLoading={deleteLoading} alert={alert} deleteStore={deleteStore} onStoreEdit={onStoreEdit} deleteItem={deleteItem} addItem={addItem} handleItemChange={handleItemChange} handleChange={handleInputChange} onItemsClose={onItemsClose} store={selectedStore} user={props.user} />
            }
        </>
    );
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyDy2jfdK5Th62DXH6kWNavGF-XlfVuXVew',
    LoadingContainer: (Loading)
})(GoogleMap);


