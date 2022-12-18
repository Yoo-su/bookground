import { useCallback } from "react";
import { setOpenSnack, setSnackInfo } from "store/slices/uiSlice";
import { useAppDispatch } from "store/hook";

const useSnack = () => {
    const dispatch = useAppDispatch();

    const activateSnack = (message: string, type: "success" | "danger" | "info") => {
        dispatch(setSnackInfo({
            message: message,
            type: type,
        }));
        dispatch(setOpenSnack(true));
    };

    return { activateSnack: useCallback(activateSnack, []) };
};

export default useSnack;