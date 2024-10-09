import React from 'react';
import { Button } from './button';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className='flex flex-row justify-between'>
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                    <Button size={'icon'} variant="outline" onClick={onClose}>{'X'}</Button>
                </div>

                <div className="space-y-4">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;
