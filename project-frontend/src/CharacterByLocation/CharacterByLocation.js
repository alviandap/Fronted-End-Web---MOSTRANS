import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import image1 from '../image/1.jpeg'; // Import the image
import './CharacterByLocation.css'; // Import file CSS eksternal


const CharactersByLocation = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate(); 
  
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/location');
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className='p-5'>
        <h2 style={{textAlign:'center', marginBottom:'15px'}}>Character By Location</h2>
        <div className='location-container'>
          {locations.map(lokasi => (
            <div className="location-card" key={lokasi.id}>
              <BasicExample 
                id={lokasi.id} 
                title={lokasi.name}
                description={lokasi.type}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

function BasicExample(props) {
  const navigate = useNavigate(); // Define navigate here
  return (
    <Card style={{ width: '18rem' }} className="card">
      <Card.Img variant="top" src={image1} className="card-image" />
      {/* <Card.Header>{props.description}</Card.Header> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            <p>From {props.origin}</p>
            </Card.Text>
        <Button 
          variant="primary" 
          onClick={() => navigate(`/characters-by-location/${props.id}`)} 
          className="float-right" style={{ backgroundColor: '#6f56f4', borderColor: 'purple' }} // Use props.id instead of location.id
        >
          List Character
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CharactersByLocation;
