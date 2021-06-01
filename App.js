import React from 'react'
import NavContainer from './src/navigation'
import Loader from './src/components/loader'
import { StoreProvider } from './src/context/store'

const App = () => {
  return (
    <StoreProvider>
      <NavContainer />
      <Loader />
    </StoreProvider>
  )
}

export default App
