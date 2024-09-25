import { useState } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";



function AccessView() {

    const [isLogin, setIsLogin] = useState(true)

    const switchLogin = (newValue: boolean) => {
        setIsLogin(newValue);
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            {isLogin ? <LoginForm switchForm={switchLogin} /> : <RegisterForm switchForm={switchLogin} />}
        </div>

    )
}

export default AccessView