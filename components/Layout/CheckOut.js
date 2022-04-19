import {  Stepper, Step, StepLabel} from '@material-ui/core'
import React from 'react'
import useStyles from '../../utils/styles/styles'

export default function CheckOut({activeStep=0}) {
    const classN = useStyles();
    return (
        <Stepper className={classN.tr_Bg} activeStep={activeStep} alternativeLabel >
            {
                ['Login', 'Shipping Address', 'Payment Methode', 'Place Order'].map(step => (
                    <Step key={step} >
                        <StepLabel >
                            {step}
                        </StepLabel>
                    </Step>
                ))
            }
            
        </Stepper>
    )
}
