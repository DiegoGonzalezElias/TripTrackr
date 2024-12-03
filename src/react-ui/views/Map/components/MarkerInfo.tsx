import { MarkerData } from '@/modules/map/domain/map.model';
import { Button } from '@/react-ui/components/button'
import { Calendar } from '@/react-ui/components/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/react-ui/components/card'
import { useTranslation } from 'react-i18next';

interface MarkerInfoProps {
    marker: MarkerData
}

function MarkerInfo({ marker }: MarkerInfoProps) {
    const { t } = useTranslation();

    return (
        <Card className="w-full max-w-[320px] border-none shadow-none">
            <CardHeader className='flex flex-row justify-between text-start'>
                <div>
                    <CardTitle className=' text-lg'>{marker.text}</CardTitle>
                    <CardDescription>{marker.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <form className='text-start'>


                    {/* Categoría del marcador */}
                    <div className="mb-4 flex items-center gap-4">
                        <label className="text-gray-800 text-sm">{t('LABELS.CATEGORY') + ': '}</label>
                        <p className="text-gray-600 text-sm">{marker.category}</p>
                    </div>
                    {/* Fecha */}
                    {marker.date && <div className='mb-4'>
                        <label className="text-gray-800 text-sm">{t('LABELS.DATE')}</label>
                        <div className='mt-[6px]'>
                            <Calendar
                                mode="single"
                                selected={new Date(marker.date)}
                                initialFocus
                            />
                        </div>
                    </div>}

                    <CardFooter className="flex p-0 mt-10 py-4">
                        <Button disabled={false} type='button' size={'lg'} className='w-full bg-destructive' onClick={() => { }}>Delete Marker</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default MarkerInfo