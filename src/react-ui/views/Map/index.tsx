import Map from "@/react-ui/views/Map/components/Map"
import Hamburger from "./components/Hamburger"
import FirstMapModal from "./components/FirstMapModal"
import { useMapManagement } from "@/react-ui/hooks/userMapManagement";
import { useEffect } from "react";
import { useAuth } from "@/react-ui/hooks/useAuth";
import { useSocketContext } from "@/react-ui/hooks/socketContext";

function MapView() {

  const { hasMap, maps } = useMapManagement();
  const { accessToken } = useAuth();
  const { subscribe, unsubscribe } = useSocketContext();

  useEffect(() => {
    if (maps && accessToken) {
      subscribe(maps[0], accessToken);
    }
    return () => {
      unsubscribe();
    };
  }, [maps]);

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