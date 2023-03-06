import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MemoType } from "../../model/memo-type.model";

export const memoTypeApi = createApi({
    reducerPath: 'memoTypeApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['MemoType'],
    endpoints: (builder) => ({
        getAllMemoType: builder.query<MemoType[], void>({
            query: () => `/findAllMemoType`,
            providesTags: ['MemoType'],
        }),
        addNewMemoType: builder.mutation({
            query: (data) => ({
                url: '/createMemoType',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['MemoType'],
        }),
        updateMemoType: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateMemoType/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['MemoType'],
        }),
        deleteMemoType: builder.mutation({
            query: (id) => ({
                url: `/removeMemoType/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MemoType'],
        }),
    }),
})

export const { 
    useGetAllMemoTypeQuery,
    useAddNewMemoTypeMutation,
    useUpdateMemoTypeMutation,
    useDeleteMemoTypeMutation
} = memoTypeApi