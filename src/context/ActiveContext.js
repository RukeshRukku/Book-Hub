import React from 'react'

const ActiveContext = React.createContext({
  active: 'Home',
  changeActive: () => {},
})

export default ActiveContext
