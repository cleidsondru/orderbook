export const ADD_SNAPSHOT = 'ADD_SNAPSHOT';

export const addSnapshot = (snapshot) => ({
    type: ADD_SNAPSHOT,
    snapshot
});

export const ADD_BOOK_UPDATE = 'ADD_BOOK_UPDATE';

export const addBookUpdate = (bookUpdate) => ({
    type: ADD_BOOK_UPDATE,
    bookUpdate,
})

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';

export const addSubscription = (subscription) => ({
    type: ADD_SUBSCRIPTION,
    subscription,
})