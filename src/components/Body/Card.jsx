import React from 'react'
import './Card.css'

export function Card({ img, name }) {
    return (
        <div className='card'>
            <img src={img} alt="" />
        </div>
    )
}

