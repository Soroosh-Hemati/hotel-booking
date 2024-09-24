import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import { useHotels } from '../context/HotelsProvider';

function SingleHotel() {
    const { id } = useParams();
    const { currentHotel, getHotel, isCurrHotelLoading } = useHotels();

    useEffect(() => {
        getHotel(id)
    }, [id])

    if (isCurrHotelLoading || !currentHotel) return <div className="loading">loading...</div>

    return ( 
        <div className="room">
            <div className="roomDetail">
                <h2>{currentHotel.name}</h2>
                <div>
                    {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
                </div>
                <img src={currentHotel.xl_picture_url} alt="" />
            </div>
        </div>
    )
}

export default SingleHotel