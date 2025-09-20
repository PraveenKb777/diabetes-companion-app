import {configureStore} from '@reduxjs/toolkit';
import cmpReducer from './slice/cmpSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    cmpReducer,
    userReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
