import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    endpoints: (builder) => ({
        // GET api's
        // getAccounts: builder.query({
        //     query: () => "/accounts",
        // }),
        getTransactions: builder.query({
            query: () => "transaction",
        }),
        // getCategories: builder.query({
        //     query: () => "/categories",
        // }),
        // getSubCategories: builder.query({
        //     query: () => "/sub-categories",
        // }),

        // POST api's
        createAccount: builder.mutation({
            query: () => "/accounts",
        }),
        // createTransaction: builder.mutation({
        //     query: () => "/account",
        // }),

        // DELETE api's
        deleteTransaction: builder.mutation({
            query: () => "/transaction",
        }),
        // deleteAccount: builder.mutation({
        //     query: () => '/account'
        // })
    }),
});

export const { useGetTransactionsQuery, useCreateAccountMutation } = transactionApi;
