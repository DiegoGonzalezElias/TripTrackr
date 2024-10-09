import { Button } from "@/react-ui/components/button";
import Modal from "@/react-ui/components/Modal";
import { useModal } from "@/react-ui/hooks/useModal";
import { EditIcon } from "@/react-ui/icons/EditIcon";
import { LogoutIcon } from "@/react-ui/icons/LogoutIcon";
import { MapIcon } from "@/react-ui/icons/MapIcon";
import { UserIcon } from "@/react-ui/icons/UserIcon";
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from "react-i18next";
import EditersModal from "./EditersModal";
import MapsModal from "./MapsModal";
import AccountModal from "./AccountModal";
import DeleteAccModal from "./DeleteAccModal";

function Hamburger() {
    const { t } = useTranslation();
    const { isModalOpen, modalTitle, openModal, closeModal } = useModal(); // Utilizamos el hook

    return (
        <>
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
                        <div
                            className="border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                            onClick={() => openModal(t('HAMBURGER_MENU.EDITORS'))}
                        >
                            <span className="icon">
                                <EditIcon width={32} height={32} />
                            </span>
                            <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.EDITORS')}</span>
                        </div>
                        <div
                            className="border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                            onClick={() => openModal(t('HAMBURGER_MENU.LOGOUT'))}
                        >
                            <span className="icon">
                                <LogoutIcon width={32} height={32} />
                            </span>
                            <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.LOGOUT')}</span>
                        </div>
                        <div
                            className="border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                            onClick={() => openModal(t('HAMBURGER_MENU.ACCOUNT'))}
                        >
                            <span className="icon">
                                <UserIcon height={32} width={32} />
                            </span>
                            <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.ACCOUNT')}</span>
                        </div>
                        <div
                            className="border flex flex-col items-center justify-center space-x-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                            onClick={() => openModal(t('HAMBURGER_MENU.MAPS'))}
                        >
                            <span className="icon">
                                <MapIcon height={32} width={32} />
                            </span>
                            <span className="text-gray-600 text-sm">{t('HAMBURGER_MENU.MAPS')}</span>
                        </div>
                    </div>

                    <div className="text-red-500 text-center text-sm cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => openModal(t('HAMBURGER_MENU.DELETE_ACCOUNT'))}
                    >
                        <p>{t('HAMBURGER_MENU.DELETE_ACCOUNT')}</p>
                    </div>
                </Popover.Content>
            </Popover.Root>

            {isModalOpen && (
                <Modal
                    title={modalTitle}
                    onClose={closeModal}
                >
                    {modalTitle === t('HAMBURGER_MENU.EDITORS') && (
                        <div>
                            <EditersModal emails={['exmaple1@email.com', 'example2@email.com']} />
                        </div>
                    )}
                    {modalTitle === t('HAMBURGER_MENU.LOGOUT') && (
                        <div className="pt-6">
                            <p>{t('DO_YOU_WANT_TO_LOGOUT')}</p>
                            <div className="flex p-0 pt-6">
                                <Button type='button' size={'lg'} className='w-full bg-chart-2' onClick={() => {/*TODO: add logic */ }}>{t('BUTTONS.LOGOUT')}</Button>
                            </div>
                        </div>
                    )}
                    {modalTitle === t('HAMBURGER_MENU.ACCOUNT') && (
                        <div>
                            <AccountModal />
                        </div>
                    )}
                    {modalTitle === t('HAMBURGER_MENU.MAPS') && (
                        <div>
                            <MapsModal maps={['mapa name 1', 'mapa name 2']} />
                        </div>
                    )}
                    {modalTitle === t('HAMBURGER_MENU.DELETE_ACCOUNT') && (
                        <div>
                            <DeleteAccModal />
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}

export default Hamburger;
