
import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter } from "@/react-ui/components/card"
import { useEditors } from "@/react-ui/hooks/useEditors"
import { useState } from "react"
import { useTranslation } from "react-i18next"

function EditersModal() {

    const [newEditor, setNewEditor] = useState("")
    const { t } = useTranslation();
    const { editors, editorsError, editorsLoading, triggerModifyEditors, isModifyEditorsLoading, modifyEditorsError } = useEditors();


    const handleAddEditor = (editorEmail: string) => {
        triggerModifyEditors({ action: 'add', editorEmail });
    }

    const handleRemoveEditor = (editorEmail: string) => {
        triggerModifyEditors({ action: 'remove', editorEmail });
    }

    if (editorsLoading) {
        return (
            <div>
                <Card className="w-full shadow-none border-none">
                    <CardContent className="px-0">
                        <p>Loading...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (editorsError) {
        return (
            <div>
                <Card className="w-full shadow-none border-none">
                    <CardContent className="px-0">
                        <p>Ups...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

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
                            <p>
                                {isModifyEditorsLoading ? "Loading..." : modifyEditorsError ? "Error adding editor" : ""}
                            </p>
                        </div>
                        <ul>
                            {editors!.map((email, index) => {
                                const isEllipsed = email.length > 18;
                                return (
                                    <div key={index} className="flex justify-between m-4">
                                        <li className="relative group">
                                            <span>
                                                {isEllipsed ? email.substring(0, 18) + '...' : email}
                                            </span>

                                            {isEllipsed && (
                                                <div className="absolute bottom-full left-0 mb-1 hidden w-max bg-gray-800 text-white text-sm py-1 px-2 rounded shadow-lg group-hover:block z-10">
                                                    {email}
                                                </div>
                                            )}
                                        </li>

                                        <Button
                                            className="bg-destructive"
                                            disabled={isModifyEditorsLoading}
                                            onClick={() => handleRemoveEditor(email)}
                                        >
                                            {t('BUTTONS.DELETE')}
                                        </Button>
                                    </div>
                                );
                            })}
                        </ul>
                    </form>
                </CardContent>
                <CardFooter className="flex p-0 py-4">
                    <Button disabled={isModifyEditorsLoading} type='button' size={'lg'} className='w-full bg-chart-2' onClick={() => handleAddEditor(newEditor)}>{t('BUTTONS.ADD')}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditersModal