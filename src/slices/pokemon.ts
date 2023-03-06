import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Pokemon {
    name: string;
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<{count: number, next: string, results: Pokemon[]}, void>({
      query: () => `pokemon`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonsQuery } = pokemonApi