import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "@/react-ui/hooks/useAuth";
import { Progress } from "@/react-ui/components/progress";

function AccessView() {
    const [isLogin, setIsLogin] = useState(true);
    const { isGettingAccessToken } = useAuth();


    const switchLogin = (newValue: boolean) => {
        setIsLogin(newValue);
    };

    return (
        !isGettingAccessToken ? (
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
            </div>) : (
            <div className="flex w-full h-[100vh] justify-center items-center">
                <div className="flex flex-col gap-3 min-w-[200px]">
                    <Progress value={33} />
                    Loading...
                </div>

            </div>
        )
    );
}

export default AccessView;
