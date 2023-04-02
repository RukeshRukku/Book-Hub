import React from 'react'

const ActiveContext = React.createContext({
  active: 'Home',
  changeActive: () => {},
  hamBurgerClick: false,
  changeHamBurgerClickWithClick: () => {},
})

export default ActiveContext
