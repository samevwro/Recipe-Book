import { RecipeIngredients } from './subFunctions/RecipeIngredients'
import { RecipeInstructions } from './subFunctions/RecipeInstructions'
import { RecipeList } from './subFunctions/RecipeList'
import './App.css'
import {  useState } from 'react'
import { ToolBar } from './subFunctions/ToolBar'




export const recipes: any = [
  { id: 0, name: "Home Made Ice Cream", instructions: ["Pour 1 cup of the cream into a saucepan and add the sugar and salt. If using a vanilla bean, scrape the seeds of the bean into the mixture and then add the vanilla pod to the saucepan.", "Warm the mixture over medium heat, just until the sugar dissolves. Remove from the heat and add the remaining cream, milk, and vanilla extract (if using extract). Whisk to combine and chill in the refrigerator.", "When ready to churn, remove the vanilla pod, whisk the mixture again, and pour it into the ice cream maker. Churn according to the manufacturer's instructions.", "Serve immediately or transfer the finished ice cream to an airtight container and place it in the freezer until ready to serve."], ingredients: ["1¾ cups heavy cream", "1¼ cup whole milk", "¾ cup sugar", "⅛ teaspoon fine sea salt", "1 tablespoon vanilla extract or 1 vanilla bean split in half lengthwise"], favorite: false },
  { id: 1, name: "Chocolate Chip Cookies", instructions: ["Preheat the oven to 375 degrees F (190 degrees C).", "In a large bowl, cream together the butter and sugar until smooth. Beat in the vanilla and eggs one at a time. Combine the flour, baking soda and salt; stir into the sugar mixture. Finally, mix in the chocolate chips. Drop by tablespoonfuls onto ungreased cookie sheets.", "Bake for 8 to 10 minutes in the preheated oven, or until edges are golden. Remove from baking sheet to cool on wire racks."], ingredients: ["1 cup butter", "½ cup white sugar", "1 cup packed brown sugar", "1 teaspoon vanilla extract", "2 eggs", "2 ½ cups all-purpose flour", "1 teaspoon baking soda", "1 teaspoon salt", "2 cups semisweet chocolate chips"], favorite: false },
  { id: 2, name: "Lipton Onion Soup Hamburgers", instructions: ["In a bowl, combine mayonnaise, bread crumbs, and soup mix", "In a large bowl, very gently stir together ground beef and mayonnaise mixture. Form the mixture into 8 patties. Press your thumb into the center of each patty to form an indetation. Refrigerate for 10 minutes.", "Grill the patties on high heat. Let them cook for 4 to 5 minutes on each side. Flipping only once. Let patties rest for 10 minutes.", "Serve and enjoy!!"], ingredients: ["½ cup Hellmann's or best foods real mayonnaise", "½ cup plain dry bread crumbs", "1 envelope Lipton recipe secrets onion soup mix", "2 pounds ground beef or ground turkey", "8 hamburger buns"], favorite: false }
]

function App() {
  const [selRecipe, setRecipe] = useState(0)
  const [Recipes, addRecipe] = useState(recipes)
  const [IsFormOpen, ChangeForm] = useState(false)
  const [formValues, setFormValues] = useState({
    name: "",
    instructions: [] as string[],
    ingredients: [] as string[],

  })
  //This is where all the information from the add recipe form is sent to be compiled then added to state
  function AddRecipe() {
    const NewRecipe = { id: Recipes.length, name: formValues.name, instructions: formValues.instructions, ingredients: formValues.ingredients, favorite: false }

    addRecipe([...Recipes, NewRecipe])
  }
  //When the favorit button is pressed it takes the selected recipe
  //then changes the favorite propertry in the object to the opposite of what it's set at
  //to either add a heart or remove it
  function favoriteRecipe(idToFavorite: number) {
    addRecipe(Recipes.map((recipes: any) => (
      recipes.id != idToFavorite ? recipes : {
        ...recipes,
        favorite: recipes.favorite? false: true
      })
    ))
  }
  //This is to delete the currently selected recipe
  //as well update all the recipes id's to match the index within the array
  //so they can be correctly id'd when rendered
  function DeleteRecipe(idToDelete: number) {

    addRecipe((Recipes: any) => Recipes.filter((R: any) => R.id !== idToDelete))
    setRecipe(0)
    const UpdatedId = (Recipes: any)=> Recipes.map((R: any, index: number) => {
      return { ...R, id: index }
    })
    addRecipe((Recipes: any)=>UpdatedId(Recipes))
  }

  return (
    <div id='mainTable'>
      <h2 className="d-flex justify-content-center">Recipe Book</h2>
      <div className='justify-content-start  border-top border-end border-start border-2 border-black rounded-top' id='toolBar'>
        <ToolBar formValues={formValues} setFormValues={setFormValues} AddRecipe={AddRecipe} IsFormOpen={IsFormOpen} ChangeForm={ChangeForm} selRecipe={selRecipe} favoriteRecipe={favoriteRecipe} deleteRecipe={DeleteRecipe} />
      </div>
      <div className="d-flex column">
        <div className="justify-content-start" id='list'><RecipeList Recipes={Recipes} setRecipe={setRecipe} selRecipe={selRecipe} /></div>
        <div className="justify-content-center flex-grow" id='Instructions'><RecipeInstructions Recipes={Recipes} selRecipe={selRecipe} /></div>
        <div className="justify-content-end flex-grow" id='Ingredients'><RecipeIngredients Recipes={Recipes} selRecipe={selRecipe} /></div>
      </div>
    </div>
  )
}

export default App
