import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TelaLogin from './TelaLogin'
import TelaCadastro from './TelaCadastro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TelaLogin />
      <TelaCadastro />
    </>
  )
}

export default App
