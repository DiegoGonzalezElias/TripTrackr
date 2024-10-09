
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import { t } from "i18next"
import { useState } from "react"


function AccountModal() {

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")

    return (
        <div>
            <Card className="w-full shadow-none border-none">
                <CardContent className="px-0">
                    <form className='text-start'>
                        <div className="flex flex-col space-y-1.5 my-6">
                            <label className=" text-gray-600 text-sm">{t('LABELS.OLD_PASS')}</label>
                            <input
                                type="password"
                                value={oldPass}
                                onChange={(e) => setOldPass(e.target.value)}
                                placeholder={t('PLACEHOLDERS.OLD_PASS')}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 my-6">
                            <label className=" text-gray-600 text-sm">{t('LABELS.NEW_PASS')}</label>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                placeholder={t('PLACEHOLDERS.NEW_PASS')}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button type='button' size={'lg'} className='w-full bg-chart-2' onClick={() => {/*TODO: add logic */ }}>{t('BUTTONS.CHANGE_PASSWORD')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AccountModal