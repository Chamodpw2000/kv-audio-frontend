import React from 'react'

const Testing = () => {

  const [count, setCount] = React.useState(0)
  return (
    <div className='w-full h-screen'>

      <h1>count is </h1>
      <h1>{count}</h1>

      <button className="" onClick={()=>{setCount(count+1)

      
      console.log(count)
      }}> Count</button>











        
    </div>
  )
}

export default Testing