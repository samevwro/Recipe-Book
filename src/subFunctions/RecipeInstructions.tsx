
export function RecipeInstructions({selRecipe, Recipes}: {selRecipe: number, Recipes: any}) {
    
    let Instructions = <>
        {Recipes[selRecipe].instructions.map((values: string[])=> 
            <li id="SpaceList">{values}</li>
        )}
    </>;
    

    return (
        <>
            <div id="LightGreen" className="rounded-bottom border border-black border-2 vh-fit-content">
                <h4 className="border-bottom border-2  border-black">{Recipes[selRecipe].name}</h4>
                <ol>{Instructions}</ol>
            </div>
        </>
    
)}