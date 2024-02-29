import Header from "./Header";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import PetList from "./PetList";
// import NewPetForm from "./NewPetForm";

function App(){

    const [pets, setPets] = useState([])
    // const [route, setRoute] = useState(window.location.pathname)

    // let component = null
    // if(route === "/"){
    //   component = <PetList pets={pets} deletePet={deletePet} updatePet={updatePet}/>
    // }
    // else if(route === "/add_pet"){
    //   component = <NewPetForm addPet={addPet}/>
    // }

    useEffect(() => {
        fetch('http://localhost:4000/pets')
        .then(response => response.json())
        .then(petsData => setPets(petsData))
    }, [])

    function deletePet(id){
        fetch(`http://localhost:4000/pets/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                setPets((pets) => pets.filter(pet => {
                    return pet.id !== id
                }))
            }
            else{
                alert("Error: Unable to delete pet!")
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

    function updatePet(id, petDataForUpdate){
        fetch(`http://localhost:4000/pets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(petDataForUpdate)
        })
        .then(response => response.json())
        .then(updatedPet => setPets(pets => pets.map(pet => {
            if(updatedPet.id === pet.id){
                return updatedPet
            }
            else{
                return pet
            }
        })))
    }

    // function navigate(event){
    //   event.preventDefault()
    //   window.history.pushState(null, "", event.target.href);
    //   setRoute(window.location.pathname)
    // }

    return (
      <div className="app">
        <NavBar/>
        <Header/>
        {/* <NewPetForm addPet={addPet}/> */}
        {/* <PetList pets={pets} deletePet={deletePet} updatePet={updatePet}/> */}
        {/* {component} */}
        <Outlet context={{pets: pets, addPet: addPet, deletePet: deletePet, updatePet: updatePet}}/>
      </div>
    );
}

export default App;