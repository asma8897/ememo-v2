import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MemoApproval } from "../../model/memo-approval.model";

export const memoApprovalApi = createApi({
    reducerPath: 'memoApprovalApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['MemoApproval'],
    endpoints: (builder) => ({
        getAllMemoApproval: builder.query<MemoApproval[], void>({
            query: () => `/findAllMemoApproval`,
            providesTags: ['MemoApproval'],
        }),
        addNewMemoApproval: builder.mutation({
            query: (data) => ({
                url: '/createMemoApproval',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['MemoApproval'],
        }),
        updateMemoApproval: builder.mutation({
            query: (payload) => {
                console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateMemoApproval/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['MemoApproval'],
        }),
        deleteMemoApproval: builder.mutation({
            query: (id) => ({
                url: `/removeMemoApproval/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MemoApproval'],
        }),
    }),
})

export const { 
    useGetAllMemoApprovalQuery,
    useAddNewMemoApprovalMutation,
    useUpdateMemoApprovalMutation,
    useDeleteMemoApprovalMutation
} = memoApprovalApi