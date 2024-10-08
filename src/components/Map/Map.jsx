import React, { useEffect, useState } from 'react'
import { useHotels } from '../context/HotelsProvider'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeoLocation';
import useUrlLocation from '../../hooks/useUrlLocation';

function Map({ markerLocations }) {

    const [mapCenter, setMapCenter] = useState([51, 3])
    const [lat, lng] = useUrlLocation();
    const { isLoading: isLoadingPosition, position: getLocationPosition, getPosition } = useGeoLocation()

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng])
    }, [lat, lng])

    useEffect(() => {
        if (getLocationPosition?.lat && getLocationPosition?.lng)
            setMapCenter([getLocationPosition.lat, getLocationPosition.lng])
    }, [getLocationPosition])


    return (
        <div className="mapContainer">
            <MapContainer className='map' center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className='getLocation'>
                    {isLoadingPosition ? 'Loading...' : 'Use your location'}
                </button>
                <DetectClick />
                <ChangeCenter position={mapCenter} />
                {
                    markerLocations.map(item => {
                        return <Marker key={item.id} position={[item.latitude, item.longitude]}>
                            <Popup>
                                {item.host_location}
                            </Popup>
                        </Marker>
                    })
                }
            </MapContainer>
        </div>
    )
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position);
    return null
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    })
    return null;
}