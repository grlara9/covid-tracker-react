import React, {useState, useEffect} from 'react'
import {MenuItem, FormControl, Select} from '@material-ui/core'
import InfoBox from './components/InfoBox';
import axios from 'axios'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  console.log("pais",countries)


  useEffect(()=>{
    const getCountries= async () => {
     const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
        console.log('data', data)
      const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
      setCountries(countries)
      }
    getCountries();
  },[])

  const onCountryChange = async (event) =>{
    const countryCode =event.target.value;

    console.log("Estemero", countryCode)

    setCountry(countryCode)
  }
  return (
    <div className="app">
      <div className="header">
      <h1>COVID-19</h1>
     <FormControl className="header__dropdown">
      <Select variant="outlined" onChange={onCountryChange}value={country}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map((country)=>(
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
      </Select>
     </FormControl>
    </div>
    <div className="app__stats">
          <InfoBox title="coronavirus" cases={12334} total={4000}/>
          <InfoBox title="Recover" cases={12334} total={4000}/>
          <InfoBox title="Deaths" cases={12334} total={4000}/>
    </div>
    </div>
  );
}

export default App;
