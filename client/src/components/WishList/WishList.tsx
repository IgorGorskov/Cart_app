import { useQuery } from "@tanstack/react-query"
import { Product } from "../ProductCard/ProductCard"
import { WishCard } from "../WishCard/WishCard"
import { fetchWish } from "../../api/product"
import { queryClient } from "../../queryClient"
import "./WishList.css"


export const WishList: React.FC = () => {
    const {isLoading, isError, data} = useQuery({queryFn: () => fetchWish(), queryKey: ['wish']}, queryClient)

    const wishList: Product[] = data?.wishList ?? []

    
    if(isLoading){
        return <p>loading...</p>
    }
    if(isError){
        return <p>error...</p>
    }
    if(data.wishList.length !== 0){
        return <>
            <h2>
                WishList
            </h2>
            <ul className="wish__list">
                {wishList.map(product => <WishCard key={product.id} product={product}/>)}
            </ul>
        </>
    }
    else{
        return<>
            WishList is empty
        </>
    }
    
}