import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Ememo } from "../../model/ememo.model";

export const EmemoApi = createApi({
    reducerPath: 'EmemoApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['Ememo'],
    endpoints: (builder) => ({
        getAllEmemo: builder.query<Ememo[], void>({
            query: () => `/findAllMemo`,
            providesTags: ['Ememo'],
        }),
        // getOneEmemo: builder.query<Ememo, number>({
        //     // query: (id) => ({
        //     //     url: `/findOneMemo/${id}`,
        //     //     providesTags: ['Ememo'],
        //     // }),
        //     query: (id) => `/findOneMemo/${id}`,
        //     providesTags: ['Ememo'],
        // }),
        getOneEmemo: builder.query({
            query: id => `/findOneMemo/${id}`
        }),
        addNewEmemo: builder.mutation({
            query: (data) => ({
                url: '/createMemo',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Ememo'],
        }),
        updateEmemo: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateMemo/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Ememo'],
        }),
        deleteEmemo: builder.mutation({
            query: (id) => ({
                url: `/removeMemo/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ememo'],
        }),
    }),
})

export const { 
    useGetAllEmemoQuery,
    useGetOneEmemoQuery,
    useAddNewEmemoMutation,
    useUpdateEmemoMutation,
    useDeleteEmemoMutation,
} = EmemoApi