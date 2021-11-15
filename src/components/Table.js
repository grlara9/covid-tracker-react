import React from 'react'
import NumberFormat from 'react-number-format'
import './Table.css'

function Table({countries}) {
    return (
        <div className="table">
            <h2>Cases By Country</h2>
            {countries.map(({country, cases}) =>(
                <tr>
                    <td>{country}</td>
                    <td> <NumberFormat value={cases} displayType={'text'} thousandSeparator={true} /></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
