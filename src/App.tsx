import { Home } from './components/Home'
import { SocketContext, socket } from './context/socket'

export function App() {
  return (
  <SocketContext.Provider value={socket}>
    <Home/>
  </SocketContext.Provider>
  )
}