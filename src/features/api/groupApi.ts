import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Group } from "../../model/group.model";

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['Group'],
    endpoints: (builder) => ({
        getAllGroup: builder.query<Group[], void>({
            query: () => `/findAllGroup`,
            providesTags: ['Group'],
        }),
        addNewGroup: builder.mutation({
            query: (data) => ({
                url: '/createGroup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Group'],
        }),
        updateGroup: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateGroup/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Group'],
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/removeGroup/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Group'],
        }),
    }),
})

export const { 
    useGetAllGroupQuery,
    useAddNewGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation
} = groupApi