import React, { useState, useEffect } from 'react'

import SearchListItem from './SearchListItem'

function SearchContainer(props) {
  const { searchData } = props

  const [query, setQuery] = useState('')

  const [filteredResults, setFilteredResults] = useState([])

  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    setFilteredResults(searchData)
  }, [searchData])

  useEffect(() => {
    // initiate the event handler
    window.addEventListener('keydown', keyNavigationHandler)

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('keydown', keyNavigationHandler)
    }
  })

  const keyNavigationHandler = (ev) => {
    if (ev.keyCode === 38) { // Up arrow key
      if (cursor > 0) {
        handleCursorUpdate(cursor - 1)
      }
    } else if (ev.keyCode === 40) { // Down arrow key
      if (cursor < filteredResults.length - 1) {
        handleCursorUpdate(cursor + 1)
      }
    }
  }

  const handleCursorUpdate = (cursorVal) => {
    setCursor(cursorVal)
  }

  const handleSearch = (ev) => {
    const query = ev.target.value
    setQuery(query)

    const iQuery = (query || '').toLowerCase()
    const filtered = searchData.filter(user => {
      const userStr = JSON.stringify(Object.values(user)).toLowerCase()
      return userStr.includes(iQuery)
    })

    setFilteredResults(filtered)
  }

  return (
    <div className='search-container'>
      <div className='search-wrapper'>
        <div className={`search-box ${query ? 'active' : ''}`}>
          <div className='icon-wrapper'>
            <div className='icon'>
              <img src='/icons/search-icon.svg' alt='' />
            </div>
          </div>

          <div className='input-wrapper'>
            <input
              type='search'
              name='search'
              className='input'
              value={query}
              onChange={handleSearch}
              maxLength='2048'
              placeholder='Search users by ID, address, name...'
            />
          </div>
        </div>

        {(query && filteredResults.length > 0) && (
          <div className='search-results-wrapper'>
            <ul>
              {filteredResults.map((user, i) =>
                <SearchListItem
                  key={user.id}
                  user={user}
                  query={query}
                  index={i}
                  cursor={cursor}
                  handleCursorUpdate={handleCursorUpdate}
                />
              )}
            </ul>
          </div>
        )}

        {(query && filteredResults.length === 0) && (
          <div className='no-match-found'>
            <div className='message'>
              No User Found
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchContainer
