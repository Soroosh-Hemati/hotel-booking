import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../../hooks/useUrlLocation';
import axios from 'axios';

const BASE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json"

function AddNewBookmark() {
    const navigate = useNavigate();
    const [lat, lng] = useUrlLocation();
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        async function getLocationData() {
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latlng=${lat},${lng}&key=AIzaSyDuwfOrsNVA9TRq_Rne1qIaKPofY6SSnyI`)
                console.log(data);
                
            } catch (error) {

            }
        }
        getLocationData()
    }, [])


    return (
        <div>
            <h2>Bookmark new location</h2>
            <form className="form">
                <div className="formControl">
                    <label htmlFor="cityName">City Name</label>
                    <input
                        type="text"
                        name='cityName'
                        id='cityName'
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="country">City Name</label>
                    <input
                        type="text"
                        name='country'
                        id='country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="buttons">
                    <button className='btn btn--back' onClick={(e) => {
                        e.preventDefault();
                        navigate(-1)
                    }}>&larr; Back</button>
                    <button className='btn btn--primary'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewBookmark