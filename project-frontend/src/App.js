import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import CharacterList from './CharacterList/CharacterList';
import CharactersByLocation from './CharacterByLocation/CharacterByLocation';
import DetailCharacter from './DetailCharacter/DetailCharacter';


class App extends React.Component{
  render(){
    return(
      // <Location />
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<CharactersByLocation />}/>
            <Route path="/characters-by-location/:locationId" element={<CharacterList />} />
            <Route path='/character/:id' element={<DetailCharacter />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}


export default App;
