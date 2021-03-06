import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core'
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import Map from './components/Map';
import { sortData } from './components/utils';
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
       const sortCases = sortData(data)
        setTableData(sortCases)
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
    <>
    <Container>
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
          <InfoBox color="warning"title="Infected" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox color="info" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox color="danger" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
    </div>

     
    <Card className="app__right">


      <CardContent>
        <Table countries={tableData}/>
      </CardContent>
    </Card>
    </Container>
  </>
  );
}

export default App;
