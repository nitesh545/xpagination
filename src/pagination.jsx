import React from 'react';

export default function Pagination({pageno, handleNextPage, handlePreviousPage}){
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button onClick={handlePreviousPage}>Previous</button>
            <h5 style={{padding: '5rem'}}>{pageno + 1}</h5>
            <button onClick={handleNextPage}>Next</button>
        </div>
    )
};
