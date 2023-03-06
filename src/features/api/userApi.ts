import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User } from "../../model/user.model";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getAllUser: builder.query<User[], void>({
            query: () => `/findAllUser`,
            providesTags: ['User'], 
        }),
        addNewUser: builder.mutation({
            query: (data) => ({
                url: '/createUser',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (payload) => {
                console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateUser/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/removeUser/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { 
    useGetAllUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi