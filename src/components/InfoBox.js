import React from 'react'
import {Card} from 'react-bootstrap'
import NumberFormat from 'react-number-format'

const InfoBox =({title, cases, total, color})=>{
  
    return(
        <div>
           
            <Card bg={color}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    Active Cases:  
                        <NumberFormat value={cases} displayType={'text'} thousandSeparator={true} />
                    <Card.Title>
                        Total cases:  <NumberFormat value={total} displayType={'text'} thousandSeparator={true} />
                    </Card.Title>
                    
                </Card.Body>
            </Card>
            
        </div>
    )
}
export default InfoBox