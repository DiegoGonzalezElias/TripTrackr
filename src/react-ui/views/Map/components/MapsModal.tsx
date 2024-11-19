import { useState, useEffect } from "react";
import { Button } from "@/react-ui/components/button";
import { Card, CardContent } from "@/react-ui/components/card";
import { useMapManagement } from "@/react-ui/hooks/userMapManagement";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/react-ui/components/select";

function MapsModal() {
    const { t } = useTranslation();
    const { maps, createMap, triggerDeleteMap, isDeleteMapLoading, deleteMapError, triggerSelectMap, isSelectMapLoading, selectMapError } = useMapManagement();
    const [selectedMap, setSelectedMap] = useState<string | null>(null);
    const [newMapName, setNewMapName] = useState('');
    const [deleteMap, setDeleteMap] = useState<string | null>(null);
    const [isNewMapCreated, setIsNewMapCreated] = useState<boolean>(false);
    const [isMapCreating, setIsMapCreating] = useState<boolean>(false);
    const [errorCreateMap, setErrorCreateMap] = useState<boolean>(false);

    useEffect(() => {
        // Selecciona el primer mapa por defecto
        if (maps && maps.length > 0) {
            setSelectedMap(maps[0]);
        }
    }, [maps]);

    const handleSelectMap = (map: string) => {
        console.log(map)
        setSelectedMap(map);
    };

    const handleCreateMap = (map: string) => {
        console.log('creatingMap')
        console.log(map)
        setIsMapCreating(true)
        createMap(map).then(() => {
            setNewMapName('')
            setIsNewMapCreated(true)
        }).catch(() => {
            setErrorCreateMap(true)
        }).finally(() => {
            setTimeout(() => {
                setIsNewMapCreated(false)
                setErrorCreateMap(false)
                setIsMapCreating(false)
            }, 3000)
        })
    };

    const handleDeleteMap = (map: string) => {
        console.log(map)
        setDeleteMap(map);
    };

    return (
        <div>
            <Card className="w-full shadow-none border-none">
                <CardContent className="px-0 mt-6">
                    {(maps && maps.length > 0) ? (
                        <div className="text-left flex flex-col gap-4">
                            <div>
                                <label className=" text-gray-600 text-sm">{t('LABELS.SELECT_MAP')}</label>
                                <form className="text-start flex gap-2 justify-start items-center">
                                    <Select onValueChange={handleSelectMap} value={selectedMap || ""}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a map" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Maps</SelectLabel>
                                                {maps.map((map, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <SelectItem value={map}>{map}</SelectItem>
                                                    </div>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="button"
                                        size="lg"
                                        disabled={isSelectMapLoading}
                                        className=" bg-chart-2 w-full"
                                        onClick={() => {
                                            // Lógica para manejar la selección del mapa
                                            if (selectedMap) {
                                                triggerSelectMap(selectedMap)
                                            }
                                        }}
                                    >
                                        {t("BUTTONS.SELECT")}
                                    </Button>
                                </form>
                                {selectMapError && <p className=" text-red-500 text-sm">Error selecting map</p>}
                            </div>
                            <div>
                                <label className=" text-gray-600 text-sm">{t('LABELS.CREATE_MAP')}</label>
                                <form className="text-start flex gap-2 justify-start items-center">
                                    <input
                                        type="text"
                                        value={newMapName}
                                        onChange={(e) => setNewMapName(e.target.value)}
                                        placeholder={t('PLACEHOLDERS.MAP_NAME')}
                                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                                    />

                                    <Button
                                        type="button"
                                        size="lg"
                                        disabled={isMapCreating}
                                        className=" bg-chart-2 w-full"
                                        onClick={() => {
                                            // Lógica para manejar la creacion del mapa del mapa
                                            handleCreateMap(newMapName)
                                        }}
                                    >
                                        {isNewMapCreated ? 'Map created ✅' : t("BUTTONS.CREATE")}
                                    </Button>

                                </form>
                                {errorCreateMap && <p className=" text-red-500 text-sm">Error creating map</p>}
                            </div>
                            <div>
                                <label className=" text-gray-600 text-sm">{t('LABELS.DELETE_MAP')}</label>
                                <form className="text-start flex gap-2 justify-start items-center">
                                    <Select onValueChange={handleDeleteMap} value={deleteMap || ""}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={t('PLACEHOLDERS.SELECT_MAP')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Maps</SelectLabel>
                                                {maps.map((map, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <SelectItem value={map}>{map}</SelectItem>
                                                    </div>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="button"
                                        size="lg"
                                        disabled={isDeleteMapLoading}
                                        className=" bg-destructive w-full"
                                        onClick={() => {
                                            // Lógica para manejar la eliminacion del mapa
                                            if (deleteMap) {
                                                triggerDeleteMap(deleteMap).then(() => setDeleteMap(null));
                                            }
                                        }}
                                    >
                                        {t("BUTTONS.DELETE")}
                                    </Button>

                                </form>
                                {deleteMapError && <p className=" text-red-500 text-sm">Error deleting map</p>}
                            </div>
                        </div>

                    ) : (
                        <p>{t("THERE_ARE_NO_MAPS")}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default MapsModal;
