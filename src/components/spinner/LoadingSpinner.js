import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

import './loadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <HashLoader
                loading={true}
                size={50}
            />
        </div>
    )
}

export default LoadingSpinner;