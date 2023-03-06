import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MemoAttachment } from "../../model/memo-attachment.model";

export const memoAttachmentApi = createApi({
    reducerPath: 'MemoAttachmentApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['MemoAttachment'],
    endpoints: (builder) => ({
        getAllMemoAttachment: builder.query<MemoAttachment[], void>({
            query: () => `/findAllMemoAttachment`,
            providesTags: ['MemoAttachment'],
        }),
        addNewMemoAttachment: builder.mutation({
            query: (data) => ({
                url: '/createMemoAttachment',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['MemoAttachment'],
        }),
        updateMemoAttachment: builder.mutation({
            query: (payload) => {
                const { id, ...body } = payload
                return {
                    url: `/updateMemoAttachment/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['MemoAttachment'],
        }),
        deleteMemoAttachment: builder.mutation({
            query: (id) => ({
                url: `/removeMemoAttachment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MemoAttachment'],
        }),
    }),
})

export const { 
    useGetAllMemoAttachmentQuery,
    useAddNewMemoAttachmentMutation,
    useUpdateMemoAttachmentMutation,
    useDeleteMemoAttachmentMutation
} = memoAttachmentApi