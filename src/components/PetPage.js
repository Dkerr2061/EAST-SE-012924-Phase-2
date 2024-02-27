import PetList from "./PetList";
import { useState, useEffect } from "react";
import Search from './Search';
import NewPetForm from "./NewPetForm";

function PetPage(){

    const [pets, setPets] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetch('http://localhost:4000/pets')
        .then(response => response.json())
        .then(petsData => setPets(petsData))
    }, [])

    const filteredPets = pets.filter(pet => {
        return pet.name.toUpperCase().includes(searchText.toUpperCase())
    })

    function updateSearchText(event){
        setSearchText(event.target.value)
    }

    function deletePet(id){
        fetch(`http://localhost:4000/pets/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if( res.ok) {
                    setPets((pets) => pets.filter(pet => {
                        return pet.id !== id
                    }))
                } else {
                    alert('Cannot delete pet at the moment.')
                }
            })
    }

    function addPet(newPet){
        fetch('http://localhost:4000/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...newPet, likes: 0})
        })
        .then(response => response.json())
        .then(newPetData => setPets([...pets, newPetData]))
    }

    function updatePet(id, petDataForUpdate) {
        fetch(`http://localhost:4000/pets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(petDataForUpdate)
        })
            .then(res => res.json())
            .then(animalData => setPets(pets => pets.map( pet => {
                if(animalData.id === pet.id) {
                    return animalData
                } else {
                    return pet
                }
            })))
    }

    return (
        <main>
            <NewPetForm addPet={addPet}/>
            <Search updateSearchText={updateSearchText} searchText={searchText}/>
            <PetList pets={filteredPets} deletePet={deletePet} updatePet={updatePet}/>
        </main>
    );
}

export default PetPage;