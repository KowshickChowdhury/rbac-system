import React from 'react'
import '././Loading.scss';

function Loading() {
    return (
        <div className="loading-container">
            {/* <div className="loading-spinner"></div> */}
            <span className="loader"></span>
            {/* <p className='loading-name'>Loading...</p> */}
        </div>
    )
}

export default Loading