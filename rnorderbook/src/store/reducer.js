import { combineReducers, configureStore } from '@reduxjs/toolkit';

const initialState = {
    bids: {},
    asks: {}
};

const orderbooks = (state = initialState, action) => {
    switch (action) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({ orderbooks });

export const store = configureStore({
    reducer: rootReducer
});