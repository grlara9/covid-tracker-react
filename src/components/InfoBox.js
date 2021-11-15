import React from 'react'
import {Card} from 'react-bootstrap'


const InfoBox =({title, cases, total, color})=>{
    return(
        <div>
           
            <Card bg={color}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>

                    <h2>{cases}</h2>

                    <Card.Title>
                        {total} Total
                    </Card.Title>
                </Card.Body>
            </Card>
            
        </div>
    )
}
export default InfoBox