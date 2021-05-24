import React, { useEffect, useState } from 'react'
import '../style.css'
import { ButtonTemp } from './ButtonTemp'
import { IconWeather } from './IconWeather'
import { InfoWeather } from './InfoWeather'
import { Temperature } from './Temperature'
import { Town } from './Town'

export const Container = () => {

   // we create the state variables which are going to store, the changes in the api

   const [dataApi, setDataApi] = useState({})
   const [temp, setTemp] = useState(0)
   const [bolean, setBolean] = useState(false)
   const [newValue, setNewValue] = useState(0)
   const [isLoadin, setIsLoadin] = useState(false)
   
   useEffect(() => {

      //we obtain the location, with its latitude and longitude

      navigator.geolocation.getCurrentPosition(function(position) {
         const lat = position.coords.latitude;
         const lon = position.coords.longitude;
         request(lat, lon)
      });
      
      //We create a request function that is responsible for making the request to the api with the coordinates

      const request = async(lat, lon) => {

         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&           appid=56056bc63b99160f81b767f8a3c68875`;

         await fetch(url)
                  .then( ( response ) => response.json() )
                  .then( ( data ) => {
                     setDataApi( data )
                     setTemp( data.main.temp )
                     setNewValue( `${Math.round(data.main.temp - 273.15)}°C` )
                     setIsLoadin( true )
                  })
      }
   },[])

   // We create a function called changeTemp which will be in charge of changing our temperature

   const changeTemp = () => {
      setBolean(!bolean)
      if (bolean) {
         setNewValue( `${Math.round(temp - 273.15)}°C`)
      } else {
         setNewValue( `${Math.round(((temp - 273.15) * 9/5 + 32))}°F`)
      }
   }

   // we created our card to show the weather with its different components

   return (
      <div className="container">
         <div className="row">
            <div className="card-container">
                  <h1 className="title"> Weather App </h1>
               <div className="card-body" >
                  <h3 className="title" >
                     <Town country={isLoadin === true  ? dataApi.sys.country : '...'} 
                           name={isLoadin === true   ? dataApi.name : '...'}/> 
                  </h3>
                  <div className="row father-tem-icon">
                     <div className="temperature" >
                        <Temperature temp={isLoadin === true ? `${newValue}` : ''} />
                     </div>
                     <div className="icon-weather" >
                        <IconWeather />
                     </div>
                  </div>
                  <div className="row" >
                     <div className="description">
                        <InfoWeather title={'Description'} 
                        info={isLoadin === true ? dataApi.weather[0].description : ''}/>
                     </div>
                     <div className="description">
                        <InfoWeather title={'Humidity'} 
                        info={isLoadin === true ? `${dataApi.main.humidity}%` : ''} />
                     </div>
                     <div className="description">
                        <InfoWeather title={'Temperature max'} 
                        info={isLoadin === true ? `${Math.round(dataApi.main.temp_max - 273.15)}°` : ''} />
                     </div>
                     <div className="description">
                        <InfoWeather title={'Pressure'} 
                        info={ isLoadin === true ? `${dataApi.main.pressure}mbar` : ''} />
                     </div>
                  </div>
               </div>
                  <div className="button mt-2"> <ButtonTemp changeTemp={changeTemp} /> </div>
            </div>
         </div>
      </div>
   )
}
