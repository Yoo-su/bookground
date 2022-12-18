import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slices/bookSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
    books: bookReducer,
    ui: uiReducer,
})

const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV === 'development' // 개발자도구 설정
    });

    return store;
};

const store = makeStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;