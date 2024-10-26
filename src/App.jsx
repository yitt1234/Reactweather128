import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import clear from './Clear.jpg';
import cloud from './Clouds.jpg';
import rain from './rain.jpg';
import haze from './haze.jpg';
import snow from './Snow.jpg';
import defa from './g.jpg';
//import rain from './assets/Rain.jpg';
// Add more imports for other weather conditions
import './App.css';

function More(props){
    const { place } = props;
    return (
        <div>


        </div>
    );
}

function App(props) {

  const [message, setMessage] = useState('');
  const [place, setPlace] = useState('');
  const [temp, settemp] = useState('');
  const [icon, setIcon] = useState('');
  const [des, setdes] = useState('');
  const [tempf, settempf] = useState('');
  const [iconf, setIconf] = useState('');
  const [iconf1, setIconf1] = useState('');
  const [tempf1, settempf1] = useState('');
  const [tempf2, settempf2] = useState('');
  const [iconf2, setIconf2] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [sunrise, setsunrise] = useState('');
  const [sunset, setsunset] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  function a() {
    const apikey = "Your Api Key";
    const city = message;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&id=524901&APPID=" + apikey + "&units=metric";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weathericon = data.weather[0].icon;

        setPlace(data.name);
        settemp(data.main.temp + "°C");
        setdes(data.weather[0].description);
        setIcon(`https://openweathermap.org/img/wn/${weathericon}@2x.png`);
        setBackgroundImage(data.weather[0].main);

        console.log(data.sys.sunrise)
          const dateObject = new Date(data.sys.sunrise * 1000)
          const humanDateFormat = dateObject.toLocaleString("en-US",{hour: "numeric"})
          const humanDateFormat2 = dateObject.toLocaleString("en-US",{minute: "numeric"})
          setsunrise(humanDateFormat +  " " + humanDateFormat2+" min")

          console.log(data.sys.sunset)
          const dateObject1 = new Date(data.sys.sunset * 1000)
          const humanDateFormat3 = dateObject1.toLocaleString("en-US",{hour: "numeric"})
          const humanDateFormat4 = dateObject1.toLocaleString("en-US",{minute: "numeric"})
          setsunset(humanDateFormat3 +  " " + humanDateFormat4+" min")
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const weathericonf1 = json.list[1].weather[0].icon;
        const weathericonf2 = json.list[2].weather[0].icon;
        const weathericonf3 = json.list[3].weather[0].icon;
        setIconf1(`https://openweathermap.org/img/wn/${weathericonf2}@2x.png`);
        setIconf(`https://openweathermap.org/img/wn/${weathericonf1}@2x.png`);
        setIconf2(`https://openweathermap.org/img/wn/${weathericonf3}@2x.png`);
        settempf("3hrㅤㅤ" + json.list[1].main.temp + "°C" + "ㅤㅤ" + json.list[1].weather[0].description);
        settempf1("6hrㅤㅤ" + json.list[2].main.temp + "°C" + "ㅤㅤ" + json.list[2].weather[0].description);
        settempf2("9hrㅤㅤ" + json.list[3].main.temp + "°C" + "ㅤㅤ" + json.list[3].weather[0].description);
      });
  }

  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${getImageUrlForWeatherCondition(backgroundImage)})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center center';
    } else {
      document.body.style.backgroundImage = `url(${defa})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center center';
    }
  }, [backgroundImage]);

  const getImageUrlForWeatherCondition = (condition) => {
    switch (condition) {
      case 'Clear':
        return clear;
      case 'Clouds':
        return cloud;
      case 'Rain':
        return rain;
      case 'Haze':
        return haze;
      case 'Snow':
        return snow;
    
      // Add more cases for other weather conditions
      default:
        return defa;
    }
  };

  return (
    <div className="ss">
      
      <br></br>
      <center>
        <input className="maininput" id="message" name="message" size="40" onChange={handleChange} placeholder="Search for Weather.."></input>
        <button onClick={a}>Search</button>
      </center>
      <br></br>
      <center>
        <div className="weathershow">
          <h1 className="place">{place}</h1>
          <img width={125} className="icon" src={icon} />
          <p className="tempe">{temp}</p>
          <p className="desc">{des}</p>
            <More place={place}/>
          <hr></hr>
          <p className="p1">
            {tempf}
            <img width={50} className="icon1" src={iconf} />
          </p>
          <hr></hr>
          <p className="p2">
            {tempf1}
            <img width={50} className="icon2" src={iconf1} />
          </p>
          <hr></hr>
          <p className="p3">
            {tempf2}
            <img width={50} className="icon3" src={iconf2} />
          </p>
          <hr></hr>
            <p>Rise:ㅤ{sunrise}ㅤㅤㅤㅤSet:ㅤ{sunset} </p>
        </div>
      </center>
    </div>
 

  );
}

export default App;
