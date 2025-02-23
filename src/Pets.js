import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [nombre, setNombre] = useState("");
    const [raza, setRaza] = useState("");
    const [edad, setEdad] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = () => {
        axios.get('https://3.145.15.93/api/pets')
            .then(response => setPets(response.data))
            .catch(error => console.error("Error fetching pets:", error));
    };

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleChangeRaza = (e) => {
        setRaza(e.target.value);
    };

    const handleChangeEdad = (e) => {
        setEdad(e.target.value);
    };

    const addPet = () => {
        console.log("Adding pet:", { nombre, raza, edad });
        axios.post('https://3.145.15.93/api/pets', { nombre, raza, edad: parseInt(edad) })
            .then(response => {
                console.log("Pet added:", response.data);
                fetchPets();
                setNombre("");
                setRaza("");
                setEdad("");
            })
            .catch(error => {
                console.error("Error adding pet:", error);
                console.error("Error details:", error.response ? error.response.data : error.message);
            });
    };

    const filteredPets = pets.filter(pet =>
        pet.nombre.toLowerCase().includes(search.toLowerCase()) ||
        pet.raza.toLowerCase().includes(search.toLowerCase()) ||
        pet.edad.toString().includes(search)
    );

    return (
        <div>
            <h1>Pets List</h1>

            <h2>Add a Pet</h2>
            <input
                type="text"
                value={nombre}
                onChange={handleChangeNombre}
                placeholder="Nombre"
            />
            <input
                type="text"
                value={raza}
                onChange={handleChangeRaza}
                placeholder="Raza"
            />
            <input
                type="number"
                value={edad}
                onChange={handleChangeEdad}
                placeholder="Edad"
            />
            <button onClick={addPet}>Add Pet</button>

            <input
                className="search-input"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pets"
            />

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Raza</th>
                        <th>Edad</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPets.map((pet, index) => (
                        <tr key={index}>
                            <td>{pet.nombre}</td>
                            <td>{pet.raza}</td>
                            <td>{pet.edad} años</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pets;
