import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/react-ui/components/card"
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
    switchForm: (newValue: boolean) => void;
}

function LoginForm({ switchForm }: LoginFormProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { t } = useTranslation();

    return (
        <div className="w-full mx-4 flex justify-center items-center max-w-[400px]">
            <Card>
                <CardHeader>
                    <CardTitle>{t('CARD_TITLE.LOGIN')}</CardTitle>
                    <CardDescription>{t('CARD_DESCRIPTION.LOGIN')}</CardDescription>
                </CardHeader>
                <CardContent className="px-10">
                    <form>
                        <div className="grid w-full items-center gap-4 mb-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="font-bold">{t('LABELS.USERNAME')}</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={t('PLACEHOLDERS.ADD_EMAIL')}
                                    className="border border-gray-300 p-2 w-full mt-2"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="font-bold mb-2">{t('LABELS.PASSWORD')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('PLACEHOLDERS.ADD_PASSWORD')}
                                className="border border-gray-300 p-2 w-full mt-2"
                            />
                        </div>

                        <div>
                            <p>{t('ARE_YOU_NOT_REGISTERED')}</p>
                            <a className="text-chart-2" href="#" onClick={() => { switchForm(false) }}>{t('BUTTONS.REGISTER')}</a>
                        </div>


                        <CardFooter className="flex justify-between p-0 mt-10">
                            <Button variant="outline" onClick={() => { {/*TODO: logic for login */ } }}>{t("BUTTONS.LOGIN")}</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm