import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Calendar } from './calendar';
import { useMarkerForm } from '../hooks/useMarkerForm';

interface MarkerFormProps {
    newMarkerText: string;
    setNewMarkerText: (value: React.SetStateAction<string>) => void;
    addMarker: () => void;
    closeForm: () => void;  // Nueva función para cerrar el formulario
}

function MarkerFrom({ newMarkerText, setNewMarkerText, addMarker, closeForm }: MarkerFormProps) {
    const formRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const {
        description,
        setDescription,
        buttonText,
        category,
        setCategory,
        date,
        setDate,
    } = useMarkerForm(newMarkerText, setNewMarkerText);

    return (
        <div ref={formRef} className="relative">
            <Card className="w-full max-w-[320px]">
                <CardHeader>
                    <CardTitle>{t('CARD_TITLE.MARKER_MENU')}</CardTitle>
                    <CardDescription>{t('CARD_DESCRIPTION.ADD_YOUR_MARKER')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4 mb-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="font-bold">{t('LABELS.TITLE')}</label>
                                <input
                                    type="text"
                                    value={newMarkerText}
                                    onChange={(e) => setNewMarkerText(e.target.value)}
                                    placeholder={t('PLACEHOLDERS.MARKER_TEXT')}
                                    className="border border-gray-300 p-2 w-full mt-2"
                                />
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="mb-4">
                            <label className="font-bold mb-2">Descripción</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Añadir descripción"
                                className="border border-gray-300 p-2 w-full mt-2"
                            />
                        </div>

                        {/* Categoría del marcador */}
                        <div className="mb-4">
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
                        {/* Fecha */}
                        <div className='mb-4'>
                            <label className="font-bold mb-2">{t('LABELS.DATE')}</label>
                            <div className='mt-2'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                        </div>


                        <CardFooter className="flex justify-between p-0 mt-10">
                            <Button variant="outline" onClick={closeForm}>{t("BUTTONS.CANCEL")}</Button>
                            <Button onClick={addMarker}>{buttonText}</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default MarkerFrom;
