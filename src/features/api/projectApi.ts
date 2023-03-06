import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Project } from "../../model/project.model";

// https://www.youtube.com/watch?v=LDS1ll93P-s

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getAllProject: builder.query<Project[], void>({
            query: () => `/findAllProject`,
            providesTags: ['Project'],
        }),
        addNewProject: builder.mutation({
            query: (data) => ({
                url: '/createProject',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Project'],
        }),
        updateProject: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateProject/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Project'],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/removeProject/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        }),
    }),
})

export const { 
    useGetAllProjectQuery,
    useAddNewProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi