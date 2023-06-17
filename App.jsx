import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';



function App() {
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
  const handleChange = (event) => {
    
    setMessage(event.target.value);
    
  };
  function a(){
  const apikey = "7ce9242fc61fc806b906c5b9538298fe"
  const city = message
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&id=524901&APPID="+ apikey +"&units=metric"

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Access the weather data here
    console.log(data);
    const weathericon = data.weather[0].icon;
    
    setPlace(data.name);
    settemp(data.main.temp + "°C")
    setdes(data.weather[0].description);
    setIcon(`https://openweathermap.org/img/wn/${weathericon}@2x.png`)
  })
  .catch(error => {
    console.log('Error:', error);
  });

  fetch(url)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    const weathericonf1 = json.list[1].weather[0].icon;
    const weathericonf2 = json.list[2].weather[0].icon;
    const weathericonf3 = json.list[3].weather[0].icon;
    setIconf1(`https://openweathermap.org/img/wn/${weathericonf2}@2x.png`)
    setIconf(`https://openweathermap.org/img/wn/${weathericonf1}@2x.png`)
    setIconf2(`https://openweathermap.org/img/wn/${weathericonf3}@2x.png`)
    settempf("3hrㅤㅤ"+json.list[1].main.temp + "°C" + "ㅤㅤ" + json.list[1].weather[0].description);
    settempf1("6hrㅤㅤ"+json.list[2].main.temp + "°C" + "ㅤㅤ" + json.list[2].weather[0].description);
    settempf2("9hrㅤㅤ"+json.list[3].main.temp + "°C" + "ㅤㅤ" + json.list[3].weather[0].description);
  });   

  }
  
  return (
   
    <div className="ss">
      <br></br>
     <center><input className="maininput" id="message"
        name="message" size="40"onChange={handleChange} placeholder='Search for Weather..'></input><button onClick={a} >Search</button></center>
<br></br>
    <center><div className="weathershow">
     
      <h1 className='place'>{place}</h1>
     
      <img width={125} className="icon" src={icon}/>
      <p className="tempe">{temp}</p>
      <p className="desc">{des}</p>
      <hr></hr>
      <p className='p1'>{tempf}<img width={50} className="icon1" src={iconf}/></p>
      <hr></hr>
      <p className='p2'>{tempf1}<img width={50} className='icon2' src={iconf1}/></p>
      <hr></hr>
      <p className='p3'>{tempf2}<img width={50} className="icon3" src={iconf2}/></p>
      <hr></hr>
      </div></center>

   
    </div>
  );
  
  }

export default App;
