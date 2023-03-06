import { useEffect } from "react";
import { useGetPokemonsQuery } from "../../slices/pokemon";

export default function PokemonSubPage(){
    const {data, isLoading, isError} = useGetPokemonsQuery();
    // useEffect(() => {
    //     if(data){
    //         console.log(data.results);
    //     }
    // }, [data]);
    return <>
        {
            isLoading ? (<div>This is loading</div>) : (<div>This is not loading</div>)
        }
        {
            data?.results?.map(res => (<div key={res.name}>{res.name}</div>))
        }
    </>
}