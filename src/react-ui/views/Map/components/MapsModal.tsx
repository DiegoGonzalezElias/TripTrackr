
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import { t } from "i18next"


interface MapsModalProps {
    maps: string[]
}

function MapsModal({ maps }: MapsModalProps) {

    return (
        <div>
            <Card className="w-full shadow-none border-none">
                <CardContent className="px-0 mt-6">
                    <form className='text-start'>
                        <ul>
                            {maps.map((map, index) => {
                                return (
                                    <li key={index}>{map}</li>
                                )
                            })}
                        </ul>
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button type='button' size={'lg'} className='w-full bg-chart-2' onClick={() => {/*TODO: add logic */ }}>{t('BUTTONS.SELECT')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default MapsModal