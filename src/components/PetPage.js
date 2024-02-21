import PetList from "./PetList";
import pets from "../data/pets";
import { useState } from "react";

console.log(pets)

function PetPage(){
const [ filterBy, setFilterBy ] = useState("")

// Rememeber that you can stack methods and use them one after another. This is useful to streamline your code and make it easier to check for conditions instead of doing long if/else statements. This is good practice! Learn this!

const filteredPets = pets.filter((pet) => {
  return pet.name.toUpperCase().includes(filterBy.toUpperCase()) 
})


    return (
        <main>
            <div className="searchbar">
                <label htmlFor="search">Search Pets:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Type a name to search..."
                    onChange={(event) =>  setFilterBy(event.target.value) }
                />
            </div>
            <PetList pets={filteredPets}/>
        </main>
    );
}

export default PetPage;