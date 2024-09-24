import React from 'react'
import { useBookmark } from '../context/BookmarkListContext'
import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom'

function Bookmark() {
    const { isLoading, bookmarks, currentBookmark } = useBookmark()
    if (isLoading) return <div>loading...</div>
    return (
        <div>
            <h2>Bookmark List</h2>
            <div className="bookmarkList">
                {
                    bookmarks.map((item) => {
                        return <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                            <div key={item.id} className={`bookmarkItem ${item.id == currentBookmark?.id ? "current-bookmark" : ''}`}>
                                <ReactCountryFlag svg countryCode={item.countryCode} />
                                &nbsp; <strong>{item.cityName}</strong> &nbsp; <span>{item.country}</span>
                            </div>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default Bookmark