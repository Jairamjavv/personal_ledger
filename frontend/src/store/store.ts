import { configureStore } from "@reduxjs/toolkit";
import { transactionApi } from "../services/transactionApi";
import { accountsApi } from "../services/accountsApi";

export const store = configureStore({
    reducer: {
        [transactionApi.reducerPath]: transactionApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            transactionApi.middleware,
            accountsApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
