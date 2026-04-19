import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import Scanner from './components/Scanner'

export default function App() {
  const [scanning, setScanning] = useState(false)

  return (
    <div className="h-full w-full bg-white">
      {!scanning
        ? <HomeScreen onStart={() => setScanning(true)} />
        : <Scanner onGoHome={() => setScanning(false)} />
      }
    </div>
  )
}
