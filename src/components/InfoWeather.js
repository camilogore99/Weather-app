import React from 'react'

export const InfoWeather = ( { title, info } ) => {
   return (
      <>
        <div className="sub-title">
            {title} :
        </div>
        <div className="contents" >
           { info } 
        </div> 
      </>
   )
}
