import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ADD_BOOK_UPDATE, ADD_SNAPSHOT, ADD_SUBSCRIPTION } from "./actions";

const priceIdx = 0;
const countIdx = 1;
const amountIdx = 2;

const initialState = {
	subscription: {},
	channelId: undefined,
	bids: {},
	asks: {},
};

const orderbooks = (state = initialState, action) => {
    // console.log(action.type);
	switch (action.type) {
		case ADD_SUBSCRIPTION:
            console.log('reducer', ADD_SUBSCRIPTION);

			return {
				...state,
				subscription: action.subscription,
			};
		case ADD_SNAPSHOT:
            console.log('reducer', ADD_SNAPSHOT);

			const { snapshot } = action;
			let bids = {};
			let asks = {};
			for (let book of snapshot[1]) {
				const [price, count, amount] = book;
				if (count > 0) {
					if (amount > 0) {
						bids = {
							...bids,
							[price]: {
								count: count,
								amount: amount,
							},
						};
					} else {
						asks = {
							...asks,
                            [price]: {
								count: count,
								amount: amount,
							},
						};
					}
				}
			}
			return {
				...state,
				channelId: snapshot[0],
                bids,
                asks
			};
		case ADD_BOOK_UPDATE:
            const {bookUpdate} = action
            const [price, count, amount] = bookUpdate[1];
            let updateBids = {...state.bids}
            let updateAsks = {...state.asks}

            if (count > 0) {
                if (amount > 0) {
                    updateBids = {
                        ...updateBids,
                        [price]: {
                            count: count,
                            amount: amount,
                        },
                    };
                } else {
                    updateAsks = {
                        ...updateAsks,
                        [price]: {
                            count: count,
                            amount: amount,
                        },
                    };
                }
            } else if (count === 0) {
                if (amount === 1) {
                    if (updateBids[price]) {
                        delete updateBids[price];
                    }
                } else if (amount === -1) {
                    if (updateAsks[price]) {
                        delete updateAsks[price];
                    }
                }
            }

			return {
				...state,
                bids: updateBids,
                asks: updateAsks,
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({ orderbooks });

export const store = configureStore({
	reducer: rootReducer,
});
