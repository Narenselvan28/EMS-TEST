import React from 'react';

const Loader = ({ id, className }) => {
    return (
        <div id={id} className={`loader ${className}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;