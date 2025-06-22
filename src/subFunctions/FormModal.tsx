import { useState, useEffect, type ChangeEvent } from "react"
import { Button, Modal } from "react-bootstrap"


type FormModalProps = {
    FormIngredients: string[],
    FormInstructions: string[],
    formValues: any,
    setFormIngredients: (value: any) => void,
    setFormInstructions: (value: any) => void,
    setFormValues: (value: any) => void,
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSubmit: () =>void,
    IsFormOpen: boolean,
    handleClose: any
    
}

export function FormModal({IsFormOpen, handleClose, formValues, setFormValues, FormIngredients, FormInstructions, setFormIngredients, setFormInstructions, handleChange, handleSubmit}: FormModalProps) {
    //state of input values
    const [FormIngredientsValue, setFormIngredientsValue] = useState("")
    const [FormInstructionsValue, setFormInstructionsValue] = useState("")
    const [InfoIsExpanded, setInfoIsExpanded] = useState(false)

    const handleInfoButtonClick = () => {
        setInfoIsExpanded(!InfoIsExpanded)
    }
    //functions to add to state for the list items and values
    let NewIngredientsList = FormIngredients.map(
        (Ingredients: string) =>
            <li>{Ingredients}</li>
    )
    let NewInstructionsList = FormInstructions.map(
        (Instuctions: string) =>
            <li key={Instuctions.indexOf(Instuctions)}>{Instuctions}</li>
    )

    const handleInstructions = (e: any) => {
        e.preventDefault()
        setFormInstructions((NewValue: string[]) => [
            ...NewValue, 
            FormInstructionsValue
        ])
        setFormInstructionsValue("")
        
    }
    useEffect(()=> {
        setFormValues({
            ...formValues,
            instructions: FormInstructions
        })
    }, [FormInstructions])
    
    const handleIngredients = (e: any) => {
        e.preventDefault()
        setFormIngredients((NewIngredients: string[]) => [
            ...NewIngredients,
            FormIngredientsValue
        ])
        setFormIngredientsValue("")
    }
    useEffect(() => {
        setFormValues({
            ...formValues,
            ingredients: FormIngredients
        })
    }, [FormIngredients])
    
    //I used a modal to input so it can be dismissed when its not neccisary
    //since your not always adding recipes and just looking
    return(
        <Modal show={IsFormOpen} onHide={handleClose} backdrop="static" keyboard={true}>
                <Modal.Header closeButton>
                    <h4>Add A Recipe</h4>
                </Modal.Header>
                <Modal.Body className="d-column justify-content-center " style={{ height: "fit-content" }}>
                    <form >
                        <div><label htmlFor="name">Recipe Name</label></div>
                        <input className="form-control" style={{ width: "100%" }} value={formValues.name} onChange={handleChange} type="text" name="name" id="nameForm" />
                    </form>
                    <br />
                    <div><label htmlFor="ingredients">Recipe Ingredients</label> </div>
                    
                    <form className="input-group">
                        <input type="text" className="form-control" id="ingredientsForm" name="ingredients" value={FormIngredientsValue} onChange={(value) => { setFormIngredientsValue(value.target.value) }}  />
                        <button className="btn btn-outline-secondary" onClick={handleIngredients} type="button" id="AddIngredient">Add</button>
                    </form>
                    <div>
                        {FormIngredients.length != 0 ? <><br /><ul id="scroll">
                            {NewIngredientsList}
                        </ul></> : null}
                    </div>
                    <br />
                    <div><label className="d-column align-items-baseline" htmlFor="instructions">Recipe Instructions</label></div>
                    <form className="input-group">
                        <textarea name="instructions" id="instructionsForm" className="form-control" style={{height: "100px" }} value={FormInstructionsValue} onChange={(event)=> {setFormInstructionsValue(event.target.value)}} />
                        <button className="btn btn-outline-secondary" onClick={handleInstructions}>Add</button>
                    </form>
                    <div>
                            {FormInstructions.length != 0 ? <><br /><ol id="scroll">
                            {NewInstructionsList}
                        </ol></> : null}
                        </div>
                    <br />
                    <div >
                        {InfoIsExpanded? <ul className="border-top border-light-subtle">
                        <li id="SpaceList">Make sure to add measurements/amount to ingredients</li>
                        <li id="SpaceList">When adding steps to the instructions add them in order</li>
                    </ul>: null}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="secondary" onClick={handleInfoButtonClick}>Info</Button>
                    <Button className="secondary"  onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onSubmit={handleSubmit} formNoValidate onClick={() => handleSubmit()}>
                        Add
                    </Button>
                    
                </Modal.Footer>
            </Modal>
    )
}