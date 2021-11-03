import React, {useState} from 'react'
import {MenuItem, FormControl, Select} from '@material-ui/core'
import './App.css';

function App() {
  const [countries, setCountries] = useState(["mexico", "USA", "Russia"])
  console.log("pais",countries)
  return (
    <div className="app">
      <div className="header">
      <h1>COVID-19</h1>
     <FormControl className="header__dropdown">
      <Select variant="outlined" value="abc">
        {countries.map((country)=>(
          <MenuItem value={country}>{country}</MenuItem>
        ))}
      </Select>
     </FormControl>
    </div>
    </div>
  );
}

export default App;
