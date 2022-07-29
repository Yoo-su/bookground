import { Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'
import { snackbarType } from '../../types/snackbarType';

export default function SnackAlert({open,setOpen,message}:snackbarType){
    
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <Fragment>
          <AiOutlineClose size={18} style={{cursor:"pointer"}} onClick={handleClose} />
        </Fragment>
      );

    return(
        <Snackbar 
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
            onClose={handleClose}
            message={<span style={{display:"flex", alignItems:"center"}}><AiOutlineInfoCircle size={16} />&nbsp;{message}</span>}
            action={action}
        />
    );
}