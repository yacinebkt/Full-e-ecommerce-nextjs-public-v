import { Typography} from '@material-ui/core'
import React from 'react'
import useStyles from "../../utils/styles/styles";



export default function Preloader() {


  const classN = useStyles();

    return (
        <div className={classN.loadingBox}>
            <div className={classN.loadingBoxItem01}></div>
            <div className={classN.loadingBoxItem02}></div>
            <div className={classN.loadingBoxItem03}></div>
            <div className={classN.loadingBoxItem04}></div>
            <Typography className={classN.loadingBoxText}>FIHA</Typography>
        
      </div>
    )
}
