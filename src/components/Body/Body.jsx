import React, { Component } from 'react'
import { Card } from './Card'
import './Body.css'
import rain from '../../assets/rain.svg'
import thunderstorm from '../../assets/thunderstorm.svg'
import wind from '../../assets/wind.svg'
import forest from '../../assets/forest.svg'

// const obj = {
//     rain: {
//         img: rain,
//         name: 'Rain'
//     },
//     thunderstorm: {
//         img: thunderstorm,
//         name: 'Thunderstorm'
//     },
// }
const obj = [
    {
        img: rain,
        name: 'Rain',
    },
    {
        img: thunderstorm,
        name: 'Thunderstorm'
    },
    {
        img: wind,
        name: 'Wind'
    },
    {
        img: forest,
        name: 'Forest'
    },
    {
        img: thunderstorm,
        name: 'Thunderstorm'
    },
    {
        img: thunderstorm,
        name: 'Thunderstorm'
    },
    {
        img: thunderstorm,
        name: 'Thunderstorm'
    },
]

export class Body extends Component {
    render() {
        return (
            <div className='body'>
                <div className="container">
                    {obj.map(el => (
                        <Card img={el.img} name={el.name} />
                    ))}
                </div>
            </div>
        )
    }
}
