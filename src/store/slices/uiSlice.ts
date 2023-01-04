import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UiSliceType, SnackPayload } from "types";

const initialState: UiSliceType = {
    openSnack: false,
    snackMessage: "",
    snackType: "success",
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setOpenSnack: (state, action: PayloadAction<boolean>) => {
            state.openSnack = action.payload;
        },

        setSnackInfo: (state, action: PayloadAction<SnackPayload>) => {
            const { message, type } = action.payload;
            state.snackMessage = message;
            state.snackType = type;
        },
    }
})

export const { setOpenSnack, setSnackInfo } = uiSlice.actions;
export default uiSlice.reducer;
