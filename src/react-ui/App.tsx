import './App.css'
import Map  from './components/Map'

function App() {

  return (
    <div className="flex flex-col h-full w-full max-h-[100vh] relative bg-slate-600">
      <header className="bg-blue-500 text-white p-4 text-center text-xl absolute top-0 z-50 w-full">
        Travel Planner Map
      </header>
      <main className="flex-grow absolute z-10 top-0 w-full">
        <Map />
      </main>
    </div>
  )
}

export default App
