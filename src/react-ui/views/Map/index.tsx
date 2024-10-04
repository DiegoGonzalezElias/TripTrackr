import Map from "@/react-ui/components/Map"
import Hamburger from "./components/Hamburger"

function MapView() {
  return (
    <div className="flex flex-col h-full w-full max-h-[100vh] relative bg-slate-600">
      <header className="flex justify-end w-full mx-auto p-4 text-xl absolute top-5 z-50">
        <Hamburger />
      </header>
      <main className="flex-grow absolute z-10 top-0 w-full">
        <Map />
      </main>
    </div>
  )
}

export default MapView