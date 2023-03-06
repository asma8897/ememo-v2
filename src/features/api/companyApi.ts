import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Company } from "../../model/company.model";

export const companyApi = createApi({
    reducerPath: 'companyApi',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3000/ememo/'}),
    tagTypes: ['Company'],
    endpoints: (builder) => ({
        getAllCompany: builder.query<Company[], void>({
            query: () => `/findAllCompany`,
            providesTags: ['Company'], 
        }),
        addNewCompany: builder.mutation({
            query: (data) => ({
                url: '/createCompany',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Company'],
        }),
        updateCompany: builder.mutation({
            query: (payload) => {
                // console.log(payload)
                const { id, ...body } = payload
                return {
                    url: `/updateCompany/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['Company'],
        }),
        deleteCompany: builder.mutation({
            query: (id) => ({
                url: `/removeCompany/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Company'],
        }),
    }),
})

export const { 
    useGetAllCompanyQuery,
    useAddNewCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation
} = companyApi