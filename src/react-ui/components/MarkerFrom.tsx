import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { useTranslation } from "react-i18next";

interface MarkerFormProps {
    newMarkerText: string;
    setNewMarkerText: (value: React.SetStateAction<string>) => void;
    addMarker: () => void;
    closeForm: () => void;  // Nueva función para cerrar el formulario
}

function MarkerFrom({ newMarkerText, setNewMarkerText, addMarker, closeForm }: MarkerFormProps) {
    const formRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const [buttonText, setButtonText] = useState('Añadir marcador');
    const [category, setCategory] = useState('Restaurante');

    // Hook para manejar el clic fuera del formulario y cerrarlo
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                closeForm();
            }
        };

        // Añade un event listener para detectar clics fuera del formulario
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpia el event listener cuando se desmonta el componente
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeForm]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setButtonText(t('BUTTONS.ADD'));  // Cambia el texto si la pantalla es menor a 600px
            } else {
                setButtonText(t('BUTTONS.ADD_MARKER'));  // Texto normal para pantallas más grandes
            }
        };

        handleResize();  // Llamada inicial para establecer el texto correcto
        window.addEventListener('resize', handleResize);  // Escucha los cambios de tamaño

        return () => {
            window.removeEventListener('resize', handleResize);  // Limpia el listener
        };
    }, []);

    return (
        <div ref={formRef} className="relative">
            <Card className="w-full max-w-[320px]">
                <CardHeader>
                    <CardTitle>{t('CARD_TITLE.MARKER_MENU')}</CardTitle>
                    <CardDescription>{t('CARD_DESCRIPTION.ADD_YOUR_MARKER')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="font-bold">{t('LABELS.ADD_NEW_MARKER')}</label>
                                <input
                                    type="text"
                                    value={newMarkerText}
                                    onChange={(e) => setNewMarkerText(e.target.value)}
                                    placeholder={t('PLACEHOLDERS.MARKER_TEXT')}
                                    className="border border-gray-300 p-2 w-full"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                {/* Categoría del marcador */}
                <div className="mb-4 p-6 pt-0">
                    <label className="font-bold mb-2">{t('LABELS.CATEGORY')}</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 p-2 w-full mt-2"
                    >
                        <option>{t('SELECT_OPTIONS.RESTAURANT')}</option>
                        <option>{t('SELECT_OPTIONS.HOSTING')}</option>
                        <option>{t('SELECT_OPTIONS.ATTRACTION')}</option>
                        <option>{t('SELECT_OPTIONS.SHOPPING')}</option>
                        <option>{t('SELECT_OPTIONS.TRANSPORT')}</option>
                        <option>{t('SELECT_OPTIONS.OTHER')}</option>
                    </select>
                </div>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={closeForm}>{t("BUTTONS.CANCEL")}</Button>
                    <Button onClick={addMarker}>{buttonText}</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default MarkerFrom;
