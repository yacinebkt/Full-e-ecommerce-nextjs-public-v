import {
  Typography,
  Controller,
  TextField,
  ListItem,
  Button,
} from "@material-ui/core";

import React, { useState, useEffect} from "react";

import useStyles from "../../utils/styles/styles";

import {
//   
  Edit,
  

} from "@material-ui/icons";

export default function EditFiled({

  title,
  description,
  action,
  editComponent,
  restValues, 
  closeAllItemsAndOpenTitle,
  openItem,
  readOnly, 
  width,
 
}) {
  const classN = useStyles();

  const [descriptionValue, setDescriptionValue]  = useState('');


  useEffect(() => {
    setDescriptionValue(description)
  }, [description])


  
  const openEditItem = () => {
    restValues();
    closeAllItemsAndOpenTitle(title)
    // setEdit(title);
  }

  
  const closeEditItem = () => {
    restValues();
    closeAllItemsAndOpenTitle('')

  }

  return (
    <>
    
    {readOnly &&

        <ListItem
          className={classN.profileAccountDetailsItem}
          style={{width : width? '100%' : '50%' }}
          
        >
        <div className={classN.titleDetails}>
        <Typography className={classN.titleDetailsfirst}>
            {title}
        </Typography>

        <Typography className={classN.titleDetailsSecond} >
            {descriptionValue}
        </Typography>
        </div>

          {action === "edit" && (
              <>
            <Button disabled className={classN.editPrfileBtnLg}  variant="contained" color="primary" endIcon={<Edit />}>
              Edit
            </Button>
             {/* <Edit disabled color="primary" className={classN.editPrfileBtnSm} /> */}
             </>
          )}
        </ListItem>
     }

      {!readOnly && openItem!=title  && (
        <ListItem
          className={classN.profileAccountDetailsItem}
          onClick={openEditItem}
        >
          <div className={classN.titleDetails}>
            <Typography className={classN.titleDetailsfirst}>
              {title}
            </Typography>

            <Typography className={classN.titleDetailsSecond} >
              {descriptionValue}
            </Typography>
          </div>

          {action === "edit" && (
              <>
            <Button  className={classN.editPrfileBtnLg}  variant="contained" color="primary" endIcon={<Edit />}>
              Edit
            </Button>
             <Edit color="primary" className={classN.editPrfileBtnSm} />
             </>
          )}
        </ListItem>
      )}

      {openItem===title  && (
        <ListItem className={classN.profileAccountDetailsItemEdit}>
          <div className={classN.titleDetails}>
            <Typography className={classN.titleDetailsfirst}>
              {title}
            </Typography>

            <div className={classN.prodileDetailsColumn}>
              {/* <Typography className={classN.titleDetailsSecond}>
                {description}
              </Typography> */}

              {editComponent }


              {action === "edit" && (
                <div className={classN.actioneditContainer}>
                    
                    
                <Button
                    className={classN.firstEditBtn}
                    variant="contained"
                    color="primary"
                    // startIcon={<Save />}
                    type="submit"
                    // onClick={channgeStatus}
                  >
                      Save
                  </Button>
                  <Button
                     className={classN.lastEditBtn}
                    variant="contained"
                    color="error"
                    onClick={closeEditItem}
                    // startIcon={<CancelPresentation />}
                  >
                    Cancel
                  </Button> 
                 
                </div>
              )}
            </div>
          </div>
        </ListItem>
      )}

      
    </>
  );
}
