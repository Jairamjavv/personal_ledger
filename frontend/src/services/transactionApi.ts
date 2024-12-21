import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Transaction {
    id: number;
    account: string;
    category: string;
    sub_category: string;
    credit: number;
    debit: number;
    date: Date;
    detail_description: string;
    description: string;
    mode: string;
}

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    endpoints: (builder) => ({
        // GET api's
        getTransactions: builder.query({
            query: () => "transaction",
        }),

        // POST api's
        createTransaction: builder.mutation({
            query: (transaction_object) => ({
                url: "transaction",
                method: "POST",
                body: transaction_object,
            }),
        }),

        // DELETE api's
        deleteTransaction: builder.mutation({
            query: (transaction_id) => ({
                url: `transaction/${transaction_id}`,
                method: "DELETE",
            }),
        }),

        // PATCH api's
        updateTransaction: builder.mutation({
            query: (transaction_object: Transaction) => ({
                url: `transaction`,
                method: "PATCH",
                body: transaction_object,
            }),
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useDeleteTransactionMutation,
    useUpdateTransactionMutation,
} = transactionApi;
