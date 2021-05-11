import React from 'react'

export const Town = ( { country, name } ) => {
   return (
      <div>
         {`${country} / ${name}`}
      </div>
   )
}
