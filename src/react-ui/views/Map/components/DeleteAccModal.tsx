
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import { useDeleteAcc } from "@/react-ui/hooks/useDeleteAcc";
import { useLogout } from "@/react-ui/hooks/useLogout";
import { useState } from "react"
import { useTranslation } from "react-i18next";


function DeleteAccModal() {

    const [deleteWord, setDeleteWord] = useState("")
    const { t } = useTranslation();
    const { deleteAcc } = useDeleteAcc();
    const { logout } = useLogout()

    const handleDelete = () => {
        deleteAcc().then(() => logout())
    }

    return (
        <div>
            <Card className="w-full shadow-none border-none">
                <CardContent className="px-0">
                    <form className='text-start'>
                        <div className="flex flex-col space-y-1.5 mt-6">
                            <label className=" text-gray-600 text-sm">{t('LABELS.DELETE_ACC')}</label>
                            <input
                                type="password"
                                value={deleteWord}
                                onChange={(e) => setDeleteWord(e.target.value)}
                                placeholder={t('PLACEHOLDERS.DELETE_ACC')}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button disabled={deleteWord !== 'Delete'} type='button' size={'lg'} className='w-full bg-destructive' onClick={() => handleDelete()}>{t('BUTTONS.DELETE')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default DeleteAccModal