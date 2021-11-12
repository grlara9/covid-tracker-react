import React, {useState, useEffect} from 'react'
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core'
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import Map from './components/Map';
import axios from 'axios'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo]= useState({})
  const [tableData, setTableData]= useState([])
  console.log("pais",countries)
  console.log("si aqui sale info sirvio", countryInfo)
  console.log("CountryTable Data>>>", tableData)

  useEffect(() => {
    const getWorldWide = async () => {
    const {data} = await axios.get("https://disease.sh/v3/covid-19/all")
    console.log("worldwide data>>>", data)
        setCountryInfo(data);
    }
    getWorldWide()
  }, []);

  useEffect(()=>{
    const getCountries= async () => {
     const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
        console.log('data', data)
      const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setTableData(data)
      setCountries(countries)
      }
    getCountries();
  },[])

  const onCountryChange = async (event) =>{
    const countryCode =event.target.value;

    console.log("Estemero", countryCode)

    setCountry(countryCode)
    const URL= countryCode === "worldwide" ?  "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const {data} = await axios.get(URL)
    console.log("this is data ,", data)
    setCountry(countryCode)

    setCountryInfo(data)

  }
  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="coronavirus" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recover" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox color="Error" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>
    <Map />
    </div>

    <Card className="app__right">
          <CardContent>
            <Table countries={tableData}/>
          </CardContent>
    </Card>

    </div>
  );
}

export default App;
