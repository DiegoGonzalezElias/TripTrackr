import { Button } from "@/react-ui/components/button";
import { EditIcon } from "@/react-ui/icons/EditIcon";
import { LogoutIcon } from "@/react-ui/icons/LogoutIcon";
import { MapIcon } from "@/react-ui/icons/MapIcon";
import { UserIcon } from "@/react-ui/icons/UserIcon";
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from "react-i18next";

function Hamburger() {
    const { t } = useTranslation();
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button className="bg-white hover:bg-slate-50 p-4 h-14">
                    <HamburgerMenuIcon className="w-8 h-8 text-black" />
                </Button>
            </Popover.Trigger>

            <Popover.Content
                align="end"
                sideOffset={10}
                className="bg-white shadow-lg p-6 rounded-md flex flex-col space-y-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className=" border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                        <span className="icon">
                            <EditIcon width={32} height={32} />
                        </span>
                        <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.EDITORS')}</span>
                    </div>
                    <div className=" border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                        <span className="icon">
                            <LogoutIcon width={32} height={32} />
                        </span>
                        <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.LOGOUT')}</span>
                    </div>
                    <div className="border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                        <span className="icon">
                            <UserIcon height={32} width={32} />
                        </span>
                        <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.ACCOUNT')}</span>
                    </div>
                    <div className=" border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer">
                        <span className="icon">
                            <MapIcon height={32} width={32} />
                        </span>
                        <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.MAPS')}</span>
                    </div>
                </div>

                <div className="text-red-500 text-center text-sm cursor-pointer opacity-70 hover:opacity-100">
                    {t('HAMBURGER_MENU.DELETE_ACCOUNT')}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}

export default Hamburger;

