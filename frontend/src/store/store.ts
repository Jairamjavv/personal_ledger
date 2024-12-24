import { configureStore } from "@reduxjs/toolkit";
import { transactionApi } from "../services/transactionApi";
import { accountsApi } from "../services/accountsApi";
import { categoriesApi } from "../services/categoriesApi";

export const store = configureStore({
    reducer: {
        [transactionApi.reducerPath]: transactionApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            transactionApi.middleware,
            accountsApi.middleware,
            categoriesApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
