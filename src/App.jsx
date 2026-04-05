import { useAuth } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"
import "./App.css"

function App() {

  const { loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return <AppRouter />
}

export default App