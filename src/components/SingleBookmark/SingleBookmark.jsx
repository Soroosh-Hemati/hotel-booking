import React, { useEffect } from 'react'
import { useBookmark } from '../context/BookmarkListContext'
import { useNavigate, useParams } from 'react-router-dom';

function SingleBookmark() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBookmark, isLoading, currentBookmark } = useBookmark();

    useEffect(() => {
        getBookmark(id)
    }, [id])

    const handleBack = (e) => {
        navigate(-1);
    }

    if (isLoading || !currentBookmark) return <div>loading...</div>

    return (
        <div>
            <button onClick={handleBack} className='btn btn--back'>&larr;Back</button>
            <h2>{currentBookmark.cityName}</h2>
            <p>{currentBookmark.cityName} - {currentBookmark.country}</p>
        </div>
    )
}

export default SingleBookmark