
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import { t } from "i18next"
import { useState } from "react"


interface EditersModalProps {
    emails: string[]
}

function EditersModal({ emails }: EditersModalProps) {

    const [newEditor, setNewEditor] = useState("")

    return (
        <div>
            <Card className="w-full shadow-none border-none">
                <CardContent className="px-0">
                    <form className='text-start'>
                        <div className="flex flex-col space-y-1.5 my-6">
                            <label className=" text-gray-600 text-sm">{t('LABELS.ADD_EDITOR')}</label>
                            <input
                                type="text"
                                value={newEditor}
                                onChange={(e) => setNewEditor(e.target.value)}
                                placeholder={t('PLACEHOLDERS.ADD_EMAIL')}
                                className="border border-gray-300 rounded-md p-2 w-full mt-2"
                            />
                        </div>
                        <ul>
                            {emails.map((email, index) => {
                                return (
                                    <li key={index}>{email}</li>
                                )
                            })}
                        </ul>
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button type='button' size={'lg'} className='w-full bg-chart-2' onClick={() => {/*TODO: add logic */ }}>{t('BUTTONS.APPLY')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditersModal