
import { Button } from "react-bootstrap"
import addIcon from "../assets/square-plus-regular.svg"
import heartIcon from "../assets/heart-regular.svg"
import trashIcon from "../assets/trash-can-regular.svg"
import { FormModal } from "./FormModal"
import { useState, type ChangeEvent } from "react"


type ToolBarProps = {
    favoriteRecipe: (idToFavorite: number) => void
    deleteRecipe: (id: number) => void
    selRecipe: number
    ChangeForm: (open: boolean) => void
    IsFormOpen: boolean
    AddRecipe: () => void
    formValues: any,
    setFormValues: (value: any) => void
}

export function ToolBar({ favoriteRecipe, deleteRecipe, selRecipe, ChangeForm, IsFormOpen, AddRecipe, formValues, setFormValues }: ToolBarProps) {
    const handleClose = () => ChangeForm(false)
    const handleOpen = () => ChangeForm(true)
    
    //state for form list items to be added to the other data and the table within the modal
    const [FormIngredients, setFormIngredients] = useState([] as string[])
    const [FormInstructions, setFormInstructions] = useState([] as string[])
    
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })

    //This function is to submit the new recipe values to the state holding all the recipes 
    const handleSubmit = () => {
        AddRecipe()
        setFormValues({
            name: "",
            instructions: [] as string[],
            ingredients: [] as string[]
        })
        setFormIngredients([])
        setFormInstructions([])
        ChangeForm(false)
    }
    return (
        <div id="LightGreen" className=" column-gap">
            <Button style={{ margin: 5 }} variant="outline-secondary" onClick={handleOpen}><img style={{ width: "1.2rem" }} src={addIcon} alt="" /></Button>
            <Button style={{ margin: 5 }} variant="outline-secondary" onClick={() => favoriteRecipe(selRecipe)}><img style={{ width: "1.2rem" }} src={heartIcon} alt="" /></Button>
            <Button style={{ margin: 5 }} variant="outline-secondary" onClick={() => deleteRecipe(selRecipe)}><img style={{ width: "1.2rem" }} src={trashIcon} alt="" /></Button>
            <FormModal handleClose={handleClose} IsFormOpen={IsFormOpen} formValues={formValues} setFormIngredients={setFormIngredients} setFormValues={setFormValues} FormIngredients={FormIngredients} FormInstructions={FormInstructions} setFormInstructions={setFormInstructions}handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}
