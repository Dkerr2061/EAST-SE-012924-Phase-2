import PetList from "./PetList";
import { useState, useEffect } from "react";
import Search from './Search';
import NewPetForm from "./NewPetForm";

function PetPage(){

    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetch("http://localhost:4000/pets")
            .then(res => res.json())
            .then(petData => setPets(petData))
    }, [])

    const filteredPets = pets.filter(pet => {
        return pet.name.toUpperCase().includes(searchText.toUpperCase())
    })

    function updateSearchText(event){
        setSearchText(event.target.value)
    }

    function deletePet(id){
        setPets((pets) => pets.filter(pet => {
            return pet.id !== id
        }))
    }

    function addPet(newPet){
        fetch("http://localhost:4000/pets", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPet)
    })
        .then(res => res.json())
        .then(petData => setPets([...pets, petData]))
    }

    return (
        <main>
            <NewPetForm addPet={addPet}/>
            <Search updateSearchText={updateSearchText} searchText={searchText}/>
            <PetList pets={filteredPets} deletePet={deletePet}/>
        </main>
    );
}

export default PetPage;