import Map from "@/react-ui/components/Map"
import NavBar from "@/react-ui/components/Navbar"

function MapView() {
  return (
    <div className="flex flex-col h-full w-full max-h-[100vh] relative bg-slate-600">
    <header className="left-1/2 transform -translate-x-1/2 max-w-[600px] w-[90%] mx-auto text-white p-4 text-center text-xl absolute top-5 z-50">
      <NavBar title='TripTrackr' />
    </header>
    <main className="flex-grow absolute z-10 top-0 w-full">
      <Map />
    </main>
  </div> 
    )
}

export default MapView