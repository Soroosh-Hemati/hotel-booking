import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import toast from 'react-hot-toast';
import axios from 'axios';

const HotelContext = createContext();
const BASE_URL = 'http://localhost:5000/hotels';

function HotelsProvider({ children }) {
    const [currentHotel, setCurrentHotel] = useState(null);
    const [isCurrHotelLoading, setIsCurrHotelLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get('destination')
    const room = JSON.parse(searchParams.get('options'))?.room
    const { isLoading, data: hotels } = useFetch(BASE_URL, `name_like=${destination || ""}&accommodates_gte=${room || 1}`);

    async function getHotel(id) {
        setIsCurrHotelLoading(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`)
            setCurrentHotel(data)
            setIsCurrHotelLoading(false)
        } catch (error) {
            toast.error(error.message)
            setIsCurrHotelLoading(false);
        }
    }


    return (
        <HotelContext.Provider value={{ isLoading, hotels, currentHotel, getHotel, isCurrHotelLoading }}>
            {children}
        </HotelContext.Provider>
    )
}

export default HotelsProvider

export function useHotels() {
    return useContext(HotelContext)
}