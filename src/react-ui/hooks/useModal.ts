import { useState } from "react";

export const useModal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const openModal = (title: string) => {
        setModalTitle(title);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalTitle("");
    };

    return { isModalOpen, modalTitle, openModal, closeModal };
};
