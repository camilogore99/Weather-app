import React, { useEffect, useState } from 'react'
import '../style.css'
import { ButtonTemp } from './ButtonTemp'
import { IconWeather } from './IconWeather'
import { InfoWeather } from './InfoWeather'
import { Temperature } from './Temperature'
import { Town } from './Town'

export const Container = () => {

   const [dataApi, setDataApi] = useState({})
   const [temp, setTemp] = useState(0)
   const [bolean, setBolean] = useState(false)
   const [newValue, setNewValue] = useState(0)
   const [isLoadin, setIsLoadin] = useState(false)
   
   useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
         const lat = position.coords.latitude;
         const lon = position.coords.longitude;
         request(lat, lon)
      });

      const request = async(lat, lon) => {
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=56056bc63b99160f81b767f8a3c68875`;
         await fetch(url)
                  .then( (response) => response.json() )
                  .then( ( data ) => {
                     setDataApi(data)
                     setTemp( data.main.temp)
                     setNewValue( `${Math.round(data.main.temp - 273.15)}°C ` )
                     setIsLoadin(true)
                  })
      }
   },[])

   const changeTemp = () => {
      setBolean(!bolean)
      if (bolean) {
         setNewValue( `${Math.round(temp - 273.15)}°C`)
      } else {
         setNewValue( `${Math.round(((temp - 273.15) * 9/5 + 32))}°F`)
      }
   }
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
                        <Temperature temp={isLoadin === true  ? `${newValue}` : '' } />
                     </div>
                     <div className="icon-weather" >
                        <IconWeather />
                     </div>
                  </div>
                  <div className="row" >
                     <div className="description">
                        <InfoWeather title={'Description'} 
                        info={isLoadin === true ? dataApi.weather[0].description : '' }/>
                     </div>
                     <div className="description">
                        <InfoWeather title={'Humidity'} 
                        info={isLoadin === true ? `${dataApi.main.humidity}%` : '' } />
                     </div>
                     <div className="description">
                        <InfoWeather title={'Temperature max'} 
                        info={isLoadin === true ? `${Math.round(dataApi.main.temp_max - 273.15)}°` : ''} />
                     </div>
                     <div className="description">
                        <InfoWeather title={'Pressure'} 
                        info={ isLoadin === true ? `${dataApi.main.pressure}mbar` : ''  } />
                     </div>
                  </div>
               </div>
                  <div className="button mt-2"> <ButtonTemp changeTemp={changeTemp}  /> </div>
            </div>
         </div>
      </div>
   )
}
