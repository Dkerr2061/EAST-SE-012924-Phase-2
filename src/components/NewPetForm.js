import { v4 as uuid } from "uuid";
import { useState } from "react";

function NewPetForm({ onAddPet }) {
  // This is one way to do a form, creating a state variable and function for each input box. This is the easiest way but it requires a lot of code.

// const [petNameInput, setPetNameInput] = useState('')
// const [petImageInput, SetPetImageInput] = useState('')
// const [petTypeInput, setPetTypeInput] = useState('')


const [formData, setFormData] = useState({
  name: "",
  image: "",
  animal_type: ""
})

function updateFormData(event) {
  setFormData({...formData, [event.target.name]: event.target.value})
}

// function updatePetNameInput(event) {
//   setPetNameInput(event.target.value)
// }
// function updatePetImageInput(event) {
//   SetPetImageInput(event.target.value)
// }

// function updatePetTypeInput(event) {
//   setPetTypeInput(event.target.value)
// }
// function handleSubmit(event) {
//   event.preventDefault()
//   const newAnimalObj = {
//     id: uuid(),
//     name: petNameInput,
//     image: petImageInput,
//     animal_type: petTypeInput
//   }
//   onAddPet(newAnimalObj)
// }

function handleSubmit(event) {
  event.preventDefault()
  const newPet = {
    id: uuid(),
    ...formData 
  }
  onAddPet(newPet)
  // This is done so we can reset the fields to their original value after submitting data
  setFormData({
    name: "",
    image: "",
    animal_type: ""
  })
}

    return (
      <div className="new-pet-form">
        <h2>New Pet</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={updateFormData} type="text" name="name" placeholder="Pet name" value={formData.name}/>
          <input onChange={updateFormData} type="text" name="image" placeholder="Image URL" value={formData.image}/>
          <input onChange={updateFormData} type="text" name="animal_type" placeholder="Animal type" value={formData.animal_type}/>
          <button type="submit">Add Pet</button>
        </form>
      </div>
    );
  }
  
  export default NewPetForm;