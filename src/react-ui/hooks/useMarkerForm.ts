import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

export function useMarkerForm(newMarkerText: string, setNewMarkerText: (value: React.SetStateAction<string>) => void) {
    const { t } = useTranslation();
    const [description, setDescription] = useState('');
    const [buttonText, setButtonText] = useState(t('BUTTONS.ADD_MARKER'));
    const [category, setCategory] = useState(t('SELECT_OPTIONS.RESTAURANT'));
    const [date, setDate] = useState<Date>();

    // Actualiza el texto del botón dependiendo del tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setButtonText(t('BUTTONS.ADD'));
            } else {
                setButtonText(t('BUTTONS.ADD_MARKER'));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [t]);

    return {
        description,
        setDescription,
        buttonText,
        category,
        setCategory,
        date,
        setDate,
        t,
        newMarkerText,
        setNewMarkerText,
    };
}
