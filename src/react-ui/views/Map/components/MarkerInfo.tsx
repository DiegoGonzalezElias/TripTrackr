import { IMarker } from '@/modules/map/domain/map.model';
import { Button } from '@/react-ui/components/button'
import { Calendar } from '@/react-ui/components/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/react-ui/components/card'
import { useSocketContext } from '@/react-ui/hooks/socketContext';
import { useMapManagement } from '@/react-ui/hooks/userMapManagement';
import { useTranslation } from 'react-i18next';

interface MarkerInfoProps {
    marker: IMarker
}

function MarkerInfo({ marker }: MarkerInfoProps) {
    const { t } = useTranslation();
    const { deleteMarker } = useSocketContext();
    const { maps } = useMapManagement();

    const handleDeteleMarker = () => {
        if (!maps) return
        const mapName = maps[0]
        const data: IMarker = marker
        deleteMarker(mapName, data)
    }

    return (
        <Card className="w-full max-w-[320px] border-none shadow-none">
            <CardHeader className='flex flex-row justify-between text-start'>
                <div className='max-w-[240px]'>
                    <CardTitle className='text-lg break-words overflow-hidden'>
                        <span title={marker.name} className="line-clamp-2">{marker.name}</span>
                    </CardTitle>
                    {marker.description && <CardDescription className='text-gray-800 break-words overflow-hidden'>
                        <span>{marker.description}</span>
                    </CardDescription>}
                </div>
            </CardHeader>
            <CardContent>
                <form className='text-start'>
                    {/* Categoría del marcador */}
                    <div className="mb-4 flex items-center gap-4">
                        <label className="text-gray-600 text-sm">{t('LABELS.CATEGORY') + ': '}</label>
                        <p className="text-gray-800 text-sm">{marker.category}</p>
                    </div>
                    {/* Fecha */}
                    {marker.date && <div className='mb-4'>
                        <label className="text-gray-600 text-sm">{t('LABELS.DATE')}</label>
                        <div className='mt-[6px]'>
                            <Calendar
                                mode="single"
                                selected={new Date(marker.date)}
                                initialFocus
                            />
                        </div>
                    </div>}

                    <CardFooter className="flex p-0 py-4">
                        <Button disabled={false} type='button' size={'lg'} className='w-full bg-destructive' onClick={() => { handleDeteleMarker() }}>{t('BUTTONS.DELETE_MARKER')}</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default MarkerInfo