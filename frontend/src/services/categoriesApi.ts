import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    endpoints: (builder) => ({
        // GET categories api's
        getCategories: builder.query({
            query: () => "categories",
        }),
        // GET subcategories api's
        getSubCategories: builder.query({
            query: (categoryId?: number) =>
                categoryId
                    ? `subcategories?categoryId=${categoryId}`
                    : "subcategories",
        }),

        // POST category api's
        createCategory: builder.mutation({
            query: (new_category) => ({
                url: `categories`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_category),
                method: "POST",
            }),
        }),
        // POST subcategory api's
        createSubCategory: builder.mutation({
            query: (new_sub_category) => ({
                url: `subcategories`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_sub_category),
                method: "POST",
            }),
        }),

        // PUT category api's
        updateCategory: builder.mutation({
            query: ({ category_id, updated_category }) => ({
                url: `categories/${category_id}`,
                body: updated_category,
                method: "PUT",
            }),
        }),

        // DELETE api's
        deleteCategory: builder.mutation({
            query: (category_id) => ({
                url: `categories/${category_id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    // GET api's
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    useGetSubCategoriesQuery,
    useLazyGetSubCategoriesQuery,
    // POST api's
    useCreateCategoryMutation,
    useCreateSubCategoryMutation,
    // PUT api's
    useUpdateCategoryMutation,
    // DELETE api's
    useDeleteCategoryMutation,
} = categoriesApi;
