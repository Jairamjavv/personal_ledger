import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
    reducerPath: "accountsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    endpoints: (builder) => ({
        // GET api's
        getAccounts: builder.query({
            query: () => "accounts",
        }),
        // GET account by ID
        getAccountById: builder.query({
            query: (account_id) => `accounts/${account_id}`,
        }),

        // POST api's
        createAccount: builder.mutation({
            query: (new_account) => ({
                url: `accounts`,
                body: new_account,
                method: "POST",
            }),
        }),

        // PUT update account
        updateAccount: builder.mutation({
            query: ({ account_id, updated_account }) => ({
                url: `accounts/${account_id}`,
                body: updated_account,
                method: "PUT",
            }),
        }),

        // DELETE api's
        deleteAccount: builder.mutation({
            query: (account_id) => ({
                url: `accounts/${account_id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useGetAccountByIdQuery,
    useCreateAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
} = accountsApi;
