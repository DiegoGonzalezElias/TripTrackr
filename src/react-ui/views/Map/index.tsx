import Map from "@/react-ui/views/Map/components/Map"
import Hamburger from "./components/Hamburger"
import FirstMapModal from "./components/FirstMapModal"
import { useState } from "react"

function MapView() {

  const [hasMap, setHasMap] = useState(false)
  //TODO: change hasMap calling to API asking for user map list
  //In case empty has no map and displays the modal to create one
  //In case it is not empty, call to obtain the first map on that list to display data on map

  return (
    <div className="flex flex-col h-full w-full max-h-[100vh] relative bg-slate-600">
      <header className="flex justify-end w-full mx-auto p-4 text-xl absolute top-5 z-50">
        {hasMap && <Hamburger />}
      </header>
      <main className="flex-grow absolute z-10 top-0 w-full">
        {!hasMap && <FirstMapModal />}
        <Map />
      </main>
    </div>
  )
}

export default MapView