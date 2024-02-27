import { useState } from "react";

function Pet({pet, deletePet, updatePet}){

    const [displayAnimalType, setDisplayAnimalType] = useState(false)
    const [ displayForm, setDisplayForm ] = useState(false)
    const [ formData, setFormData ] = useState( {
        name: "",
        image: "",
        animal_type: ""
    }
    )

    function toggleDisplayAnimalType(){
        setDisplayAnimalType(displayAnimalType => !displayAnimalType)
    }

    function handleAdoptButtonClick(){
        deletePet(pet.id)
    }

    function toggleDisplayForm() {
        setDisplayForm(displayForm => !displayForm)
    }

    function handleSubmit(event) {
        event.preventDefault()
        updatePet(pet.id, formData)
        toggleDisplayForm()

    }

    function handleAnimalEdit(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleLikes() {
        updatePet(pet.id, {likes: pet.likes + 1})
    }

    return (
        <li className="pet">
            <img src={pet.image} alt={pet.name}/>
            <h4 onClick={toggleDisplayAnimalType} className={displayAnimalType ? "display-animal-type" : ""}>{displayAnimalType ? pet.animal_type : pet.name}</h4>
            { !displayForm ?
            <div className="button-div">
                <button onClick={toggleDisplayForm} className="update-button">Update Pet</button>
                <button className="like-button" onClick={handleLikes}>Likes: {pet.likes} </button>
                <br/>
                <button onClick={handleAdoptButtonClick} className="adopt-button">Adopt</button>
            </div> :
            <form className="edit-pet" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Pet name" 
                onChange={handleAnimalEdit} 
                value={formData.name}/>
                <input type="text" name="image" placeholder="Image URL" 
                onChange={handleAnimalEdit} 
                value={formData.image}/>
                <input type="text" name="animal_type" placeholder="Animal type" onChange={handleAnimalEdit} 
                value={formData.animal_type}/>
                <button type="submit">Save Changes</button>
            </form>
            }
        </li>
    );
}

export default Pet;