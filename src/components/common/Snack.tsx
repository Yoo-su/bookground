import { Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "store/hook";
import { setOpenSnack } from "store/slices/uiSlice";

const Snack = () => {
    const dispatch = useAppDispatch();
    const { snackMessage, snackType, openSnack } = useAppSelector((state) => state.ui)
    const handleStyle = (type: string) => {
        if (type === "success") {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#00ab66", color: "#fff" }
            }
        }
        else if (type === "danger") {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#b32134", color: "#fff" }
            }
        }
        else {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#24a0ed", color: "#fff" }
            }
        }
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(setOpenSnack(false));
    };

    const action = (
        <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon />
        </IconButton>
    );
    return (
        <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
            message={snackMessage}
            action={action}
            sx={handleStyle(snackType)}
        />
    );
};

export default Snack;