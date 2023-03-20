import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const LoadingSpinner = () => {
    return (
        <div className={`flex flex-row justify-center items-center p-12`}>
            <FontAwesomeIcon
                icon={faCircleNotch}
                className={`fa-spin text-5xl text-main`}
            />
        </div>
    )
}

export default LoadingSpinner
