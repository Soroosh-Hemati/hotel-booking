import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../../hooks/useUrlLocation';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import { useBookmark } from '../context/BookmarkListContext';


const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddNewBookmark() {
    const navigate = useNavigate();
    const [lat, lng] = useUrlLocation();
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [countryCode, setCountryCode] = useState("")
    const [isLoadingGeoCoading, setIsLoadingGeoCoading] = useState(false);
    const [geoCodingError, setGeoCodingError] = useState(null);
    const { createBookmark } = useBookmark();

    useEffect(() => {
        if (!lat || !lng) return

        async function getLocationData() {
            setIsLoadingGeoCoading(true);
            setGeoCodingError(null)
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
                if (!data.countryCode) {
                    throw new Error("This location is not a city, please click on a valid location!")
                }
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setCountryCode(data.countryCode)
            } catch (error) {
                setGeoCodingError(error.message)
            } finally {
                setIsLoadingGeoCoading(false)
            }
        }
        getLocationData()
    }, [lat, lng])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cityName || !country) return

        const newBookmark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country,
        }
        await createBookmark(newBookmark)
        navigate('/bookmark')
    }


    if (isLoadingGeoCoading) return <div>loading...</div>
    if (geoCodingError) return <p>{geoCodingError}</p>

    return (
        <div>
            <h2>Bookmark new location</h2>
            <form className="form" onSubmit={handleSubmit}>
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
                    <span><ReactCountryFlag className='flag' svg countryCode={countryCode} /></span>
                </div>
                <div className="buttons">
                    <button className='btn btn--back' onClick={(e) => {
                        e.preventDefault();
                        navigate(-1)
                    }}>&larr; Back</button>
                    <button className='btn btn--primary' type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewBookmark