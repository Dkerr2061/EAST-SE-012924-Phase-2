import { useState } from "react";

function Pet({pet}){
    const [ count, setCount ] = useState(0)
    const [ displayAnimalType, setDisplayAnimalType ] = useState(false)

    const animalClassName = displayAnimalType ? "display-animal-type" : ""
    

    function handleClick() {
        setCount((count) => count + 1)
    }

    function toggleSwitch() {
        setDisplayAnimalType((displayAnimalType) => !displayAnimalType)
    }

    return (
        <li className="pet">
            <img src={pet.image} alt={pet.name}/>
            <h4 
                className={animalClassName} 
                onClick={toggleSwitch}>
                {displayAnimalType ? pet.animal_type : pet.name}
            </h4>
            <button 
                className="like-button" 
                onClick={handleClick}>
                {`${count} Likes`}
            </button>
        </li>
    );
}

export default Pet;