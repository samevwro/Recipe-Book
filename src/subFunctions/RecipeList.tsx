
import { ListRender } from "./ListRender";

export function RecipeList({setRecipe, selRecipe, Recipes}: {setRecipe: (id:number) =>void; selRecipe: number; Recipes: []}) {
    
    const handleRecipeClick = (id: number) => {
        setRecipe(id)
    }

    let RecipeList = Recipes.map(
        (recipes: { id: any; name: any; favorite: boolean}) =>
            <ListRender favorite={recipes.favorite} key={recipes.id} onSelected={handleRecipeClick} selectedRecipe={selRecipe == recipes.id}
                recipeId={recipes.id} RecipeName={recipes.name}
            />)

    return (

        <>
            <div id="LightGreen" className="rounded-bottom border-start border-end border-bottom border-top border-2 border-black">
                <h4 className="border-bottom border-left border-2  border-black">Recipe List</h4>
                <ul>
                    {RecipeList}
                </ul>
            </div>

        </>

    )
}