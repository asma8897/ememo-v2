import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Department } from "../../model/department.model";

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['Department'],
    endpoints: (builder) => ({
        getAllDepartment: builder.query<Department[], void>({
            query: () => `/findAllDepartment`,
            providesTags: ['Department'],
        }),
        addNewDepartment: builder.mutation({
            query: (data) => ({
                url: '/createDepartment',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Department'],
        }),
        updateDepartment: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateDepartment/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Department'],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/removeDepartment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Department'],
        }),
    }),
})

export const { 
    useGetAllDepartmentQuery,
    useAddNewDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation
} = departmentApi