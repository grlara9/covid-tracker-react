import React from 'react'
import './Table.css'

function Table({countries}) {
    return (
        <div className="table">
            <h2>Cases By Country</h2>
            {countries.map(({country, cases}) =>(
                <tr>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            ))}
        </div>
    )
}

export default Table
