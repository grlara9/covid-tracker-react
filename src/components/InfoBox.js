import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

const InfoBox =({title, cases, total})=>{
    return(
        <div>
            <Card className="infoBox">
                <CardContent>
                    <Typography color="textSecondary">{title}</Typography>

                    <h2>{cases}</h2>

                    <Typography color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
export default InfoBox