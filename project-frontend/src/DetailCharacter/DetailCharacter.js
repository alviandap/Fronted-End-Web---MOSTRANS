// DetailCharacter.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import './DetailCharacter.css'; // Import file CSS eksternal


const DetailCharacter = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState([null]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCharacter = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setCharacter(data);
    };

    getCharacter();

    const getLocation = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/location');
      const data = await response.json();
      setLocations(data.results);
    };

    getLocation();
  }, [id]);

  const assignLocation = () => {
    if (!selectedLocation) {
      alert('Please select a location');
      return;
    }
    // Save logic for assigning character to location
    alert(`Assigned character ${character.name} to location ${selectedLocation}`);
    navigate('/');
  };

  return (
    <div className='p-5'>
         <Button variant="primary" onClick={() => navigate(`/`)}
            className="float-right" style={{ backgroundColor: '#6f56f4', borderColor: 'purple' }}
            >
            <FontAwesomeIcon icon={faCaretLeft} style={{ marginRight: '5px' }}/>
            Back To Menu
        </Button>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>PROFILE</h1>

        <div className='character-details-container' style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            {character && (
                <div>
                    <img src={character.image} alt={character.name} style={{ height: '400px' }} />
                </div>
            )}

            </div>
            <div>
                {character && ( 
                <div>
                    <p>Name : {character.name}</p>
                    <p>Status : {character.status}</p>
                    <p>Species : {character.species}</p>
                    <p>Gender : {character.gender}</p>
                    <p>Origin : {character.origin && character.origin.name}</p>
                    <p>Location : {character.location && character.location.name}</p>
                    <label htmlFor="locations" style={{marginRight :'5px'}}>Select Location: </label>
                    <select id="locations" onChange={(e) => setSelectedLocation(e.target.value)}>
                        <option value="">Select location </option>
                        {locations.map(location => (
                            <option key={location.id} value={location.name}>{location.name}</option>
                        ))}
                    </select>
                    <button onClick={assignLocation} style={{margin : "5px", borderRadius : "10px"}}>
                        <FontAwesomeIcon icon={faFloppyDisk} style={{ marginRight: '5px' }}/>
                        Assign to Location
                    </button>
                </div>
                )}
            </div>
        </div>

    </div>
  );
};

export default DetailCharacter;
