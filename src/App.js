import moment from "moment"
import { useEffect, useState } from "react"
function App() {
  const [city, setCity] = useState('pune')
  const [weather, setWeather] = useState({})

  const getWheather = async () => {


    const apiKey = '792bb4cb992bd5cccb1a1ac3cbc6ab98'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(url)
    const wData = await response.json()
    setWeather(wData)

  }

  useEffect(() => {
    getWheather()
  }, [])

  var icon = `http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`
  return (
    <>
      <div className="row" style={{ width: '50%', alignItems: 'center', justifyContent: 'center', display: 'flex', margin: 'auto', padding: 10 }}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipient's username" onChange={(event) => {
            setCity(event.target.value)
          }} />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => getWheather()}>Search</button>
        </div>
      </div>
      <div style={{ width: '50%', alignItems: 'center', backgroundColor: 'gray', borderRadius: 15, display: 'flex', margin: 'auto', padding: 10, flexDirection: 'column' }}>
        <h1>{weather?.name}, {weather?.sys?.country}</h1>
        <h1>{weather?.main?.temp}&deg;C</h1>
        <img src={icon} alt="" />
        <h6>Current Time - {moment.unix(weather?.dt).format("HH:mm A")}</h6>
        <h5>Sunrise - {moment.unix(weather?.sys?.sunrise).format('HH:mm A')} , Sunset - {moment.unix(weather?.sys?.sunset).format('HH:mm A')}</h5>
        <h6>Humidity - {weather?.main?.humidity}%, Wind Speed - {weather?.wind?.speed}KM/H</h6>
      </div>
    </>
  )
}
export default App;
