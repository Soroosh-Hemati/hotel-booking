import React from 'react'
import Map from '../Map/Map'
import { Outlet } from 'react-router-dom'

function BookmarkLayout() {
    return (
        <div className='appLayout'>
            <div className="sidebar">
                <Outlet />
            </div>
            <Map markerLocations={[]} />
        </div>
    )
}

export default BookmarkLayout