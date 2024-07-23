
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({children}){
    const [searchParams,setSearchParams]=useState('');
    const[loading,setLoading]=useState(false);
    const [recipeList,setRecipeList]=useState([]);
    const[recipeDetailsData,setRecipeDetailsData]=useState(null);
    const[favoritesList,setFavoritesList]=useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`);
            const data = await res.json();
            console.log(data);
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParams('');
                navigate('/');
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setSearchParams('');
        }
    };
    console.log(loading,recipeList);

    const handleAddToFavorite = (getCurrentItem) =>{
        let cpyFavoriteList = [...favoritesList];
        const index = cpyFavoriteList.findIndex(item=>item.id===getCurrentItem.id);
        if(index==-1){
            cpyFavoriteList.push(getCurrentItem);
        }
        else{
            cpyFavoriteList.splice(index);
        }
        setFavoritesList(cpyFavoriteList);
        console.log(favoritesList,'favoritesList');
    }


    return <GlobalContext.Provider value={{searchParams,loading,recipeList,setSearchParams,handleSubmit,recipeDetailsData,setRecipeDetailsData,favoritesList,setFavoritesList,handleAddToFavorite}}>{children}</GlobalContext.Provider>
}

