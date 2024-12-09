import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
    reducerPath: "accountsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    endpoints: (builder) => ({
        // GET api's
        getAccounts: builder.query({
            query: () => "/account",
        }),

        // POST api's
        createAccount: builder.mutation({
            query: (new_account) => ({
                url: `account`,
                body: new_account,
                method: "POST",
            }),
        }),

        // DELETE api's
        deleteAccount: builder.mutation({
            query: (account_id) => ({
                url: `account/${account_id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useCreateAccountMutation,
    useDeleteAccountMutation,
} = accountsApi;
