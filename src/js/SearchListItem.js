import React, { useEffect, useRef } from 'react'

function SearchListItem({ index, user, query, cursor, handleCursorUpdate }) {

  const listItemRef = useRef(null)

  useEffect(() => {
    if (index === cursor) {
      listItemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [index, cursor])

  const getHighlightedText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <>
        {parts.map((part, i) => 
          <span key={i} className={`${part.toLowerCase() === highlight.toLowerCase() ? 'text-match' : ''}`}>
            {part}
          </span>)
        }
      </>
    )
  }

  const isQueryFoundInOtherItems = () => {
    const newUser = Object.assign({}, user)
    delete newUser.name
    delete newUser.address
    delete newUser.pincode

    const userStr = JSON.stringify(Object.values(newUser)).toLowerCase()
    return userStr.includes(query.toLowerCase())
  }

  const onHover = (index) => {
    if (cursor !== index) {
      handleCursorUpdate(index)
    }
  }

  return (
    <li
      ref={listItemRef}
      className={`${cursor === index ? 'active' : ''}`}
      onMouseOver={() => onHover(index)}
    >
      <div className='user'>
        <div className='name'>
          {getHighlightedText(user.name, query)}
        </div>
        {query && isQueryFoundInOtherItems() && (
          <div className='other-items-match'>
            <div className='prefix'></div>
            <span>"{query}" found in other items</span>
          </div>
        )}
        <div className='address'>
          {getHighlightedText(`${user.address} - ${user.pincode}`, query)}
        </div>
      </div>
    </li>
  )
}

export default SearchListItem
