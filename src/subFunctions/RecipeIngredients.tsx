
export function RecipeIngredients({selRecipe, Recipes}: {selRecipe: number, Recipes: any}) {
    
let IngredientsList = Recipes[selRecipe].ingredients.map((ingredients: string) => 
<li>{ingredients}</li>
)

    return (
    <>
    <div id="LightGreen" className=" border-top border-start border-end border-bottom border-2 border-black rounded-bottom vh-fit-content">
        <h4 className="border-bottom border-2 border-black">Recipe Ingredients</h4>
        <ul>{IngredientsList}</ul>
    </div>
    
    </>
)}