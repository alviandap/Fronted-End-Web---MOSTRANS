import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import './CharacterList.css'; // Import file CSS eksternal

const CharacterList = () => {
    const navigate = useNavigate();
    const { locationId } = useParams();
    const [characters, setCharacters] = useState([]);
    const [nameLocation, setNameLocation] = useState('');

    useEffect(() => {
        const fetchCharactersByLocation = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
                const data = await response.json();
                const residentsURLs = data.residents;

                const characterDataPromises = residentsURLs.map(async residentURL => {
                    const characterResponse = await fetch(residentURL);
                    return characterResponse.json();
                });

                const charactersData = await Promise.all(characterDataPromises);

                setCharacters(charactersData);
            } catch (error) {
                console.error('Error fetching characters by location:', error);
            }
        };

        fetchCharactersByLocation();
    }, [locationId]);

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
                const data = await response.json();
                setNameLocation(data.name);
            } catch (error) {
                console.error('Error fetching location name:', error);
            }
        };

        fetchName();
    }, [locationId]);

    return (
        <div className='p-5'>
            <Button variant="primary" onClick={() => navigate(`/`)}
                className="float-right" id="backButton">
                <FontAwesomeIcon icon={faCaretLeft} style={{ marginRight: '5px' }} />
                Back To Menu
            </Button>

            <h2 className="title">Characters From {nameLocation}</h2>
            <div className="character-container">
                {characters.map(karakter => (
                    <div key={karakter.id} className="character-card">
                        <BasicExample
                            id={karakter.id}
                            title={karakter.name}
                            origin={karakter.origin.name}
                            image={karakter.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

function BasicExample(props) {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem' }} className="card">
            <Card.Img variant="top" src={props.image} className="card-image" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <p>From {props.origin}</p>
                </Card.Text>
                <Button variant="primary" onClick={() => navigate(`/character/${props.id}`)}
                    className="detail-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: '5px' }} />
                    Detail Character
                </Button>
            </Card.Body>
        </Card>
    );
}

export default CharacterList;
