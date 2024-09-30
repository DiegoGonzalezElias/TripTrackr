import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function AccessView() {
    const [isLogin, setIsLogin] = useState(true);

    const switchLogin = (newValue: boolean) => {
        setIsLogin(newValue);
    };

    return (
        <div className="w-full h-[100vh] flex justify-center gap-[6rem]">
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-end items-center">
                {isLogin ? <LoginForm switchForm={switchLogin} /> : <RegisterForm switchForm={switchLogin} />}
            </div>

            <div className="hidden lg:flex lg:w-1/2 justify-start items-center">
                <img
                    src="/side-login-map.webp"
                    alt="Travel Illustration"
                    className="w-3/4 h-3/4 object-cover rounded-lg"
                />
            </div>
        </div>
    );
}

export default AccessView;
