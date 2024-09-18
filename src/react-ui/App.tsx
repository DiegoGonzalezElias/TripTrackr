import './App.css'
import Map from './components/Map'
import NavBar from './components/Navbar'

function App() {

  return (
    <div className="flex flex-col h-full w-full max-h-[100vh] relative bg-slate-600">
      <header className="left-1/2 transform -translate-x-1/2 max-w-[600px] w-[90%] mx-auto text-white p-4 text-center text-xl absolute top-5 z-50">
        <NavBar title='Navbar' />
      </header>
      <main className="flex-grow absolute z-10 top-0 w-full">
        <Map />
      </main>
    </div>
  )
}

export default App
