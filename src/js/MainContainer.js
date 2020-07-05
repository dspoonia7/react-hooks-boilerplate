import React, { useState, useEffect } from 'react'

import SearchContainer from './SearchContainer'

function MainContainer() {

  const [loading, setloading] = useState(true)

  const [error, setError] = useState(null)

  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    setloading(true)
    
    fetch('https://run.mocky.io/v3/6d6a050f-537d-4ce7-85f5-8c433d4f1f6b')
      .then(response => response.json())
      .then(data => {
        setloading(false)
        setSearchData(data)
      })
      .catch((error) => {
        setloading(false)
        console.error('Error: ', error)
        setError('Error fetching data!')
      })
  }, [])

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Search</h1>
      </header>

      <div className='main-content'>
        {loading ? (
          <div className='flex-center main-loader'>Loading...</div>
        ) : error ? (
          <div className='flex-center main-error'>{error}</div>
        ) : (
          <SearchContainer searchData={searchData} />
        )}
      </div>
    </div>
  )
}

export default MainContainer
