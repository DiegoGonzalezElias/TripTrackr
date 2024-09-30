import { Button } from "@/react-ui/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/react-ui/components/card"
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
        <div className="w-full mx-4 flex justify-center items-center max-w-[450px]">
            <Card className="w-full flex flex-col gap-4 shadow-none border-none">
                <CardHeader>
                    <CardTitle className=" text-3xl font-bold text-start">{t('CARD_TITLE.WELCOME_BUDDY')}</CardTitle>
                    <p className="flex flex-col items-start leading-5">Get in, log on, and level up your <span>game—quick, easy, and hassle-free!</span></p>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4 mb-4">
                            <div className="flex flex-col items-start space-y-1.5">
                                <label className=" text-sm">{t('LABELS.EMAIL')}</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={t('PLACEHOLDERS.ADD_EMAIL')}
                                    className="border rounded-xl border-gray-800 p-2 w-full mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-4 items-start">
                            <label className="text-sm">{t('LABELS.PASSWORD')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('PLACEHOLDERS.ADD_PASSWORD')}
                                className="border rounded-xl border-gray-800 p-2 w-full mt-2"
                            />
                        </div>

                        <div className="w-full flex justify-end">
                            <a className="text-chart-2 underline text-sm" href="#" onClick={() => { }}>{t('BUTTONS.FORGOT_PASSWORD')}</a>
                        </div>


                        <CardFooter className="flex flex-col gap-6 p-0 mt-10">
                            <Button className="w-full text-xl p-6" variant="outline" onClick={() => { {/*TODO: logic for login */ } }}>{t("BUTTONS.LOGIN")}</Button>
                            <p className="text-sm">{t('ARE_YOU_NOT_REGISTERED')} <a className="text-chart-2" href="#" onClick={() => { switchForm(false) }}>{t('BUTTONS.REGISTER')}</a></p>
                        </CardFooter>
                    </form>
                </CardContent>
                <p className="text-gray-400 mt-28 text-center">©2025 ALL RIGHTS RESERVED</p>
            </Card>
        </div>
    )
}

export default LoginForm