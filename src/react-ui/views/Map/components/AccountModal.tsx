
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import useChangePass from "@/react-ui/hooks/useChangePass";
import { useTranslation } from "react-i18next"


function AccountModal() {

    const { changePassword, newPass, setNewPass, oldPass, setOldPass, error, loading } = useChangePass();
    const { t } = useTranslation();

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
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button disabled={loading} type='button' size={'lg'} className='w-full bg-chart-2' onClick={changePassword}>{t('BUTTONS.CHANGE_PASSWORD')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AccountModal