import React from 'react'
import Map from '../Map/Map'

function Bookmark() {
    return (
        <div className='appLayout'>
            <div className="sidebar">
                {/* <Outlet/> */}
                <div>bookmarkList</div>
            </div>
            <Map markerLocations={[]}/>
        </div>
    )
}

export default Bookmark