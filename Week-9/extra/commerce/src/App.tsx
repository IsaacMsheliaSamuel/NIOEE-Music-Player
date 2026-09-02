import Card from "./components/card"
import Navbar from "./components/Navbar"
function App() {

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default App
