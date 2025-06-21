
type listRenderProps = {
    recipeId: number
    RecipeName: string
    onSelected: (id: number) =>void
    selectedRecipe: boolean
    favorite: boolean
}


export function ListRender({recipeId, onSelected, selectedRecipe, RecipeName, favorite}: listRenderProps) {
    return(
        <><li onClick={() => onSelected(recipeId)} className={selectedRecipe == true ? 'rounded border border-primary text-bg-secondary': ''}   id={String(recipeId)}>{RecipeName} {(favorite)? "❤️" : ""}</li></>
    )
}