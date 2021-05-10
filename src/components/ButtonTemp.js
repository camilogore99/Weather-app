import React from 'react'

export const ButtonTemp = ( { changeTemp } ) => {

   return (
      <div>
         <button className="btn btn-primary" onClick={() => {
            changeTemp()
         } } > Change °F / °C </button>
      </div>
   )
}
