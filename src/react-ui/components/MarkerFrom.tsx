import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface MarkerFormProps {
    newMarkerText: string;
    setNewMarkerText: (value: React.SetStateAction<string>) => void;
    addMarker: () => void;
    closeForm: () => void;  // Nueva función para cerrar el formulario
}

function MarkerFrom({ newMarkerText, setNewMarkerText, addMarker, closeForm }: MarkerFormProps) {
    const formRef = useRef<HTMLDivElement>(null);
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
                setButtonText('Añadir');  // Cambia el texto si la pantalla es menor a 600px
            } else {
                setButtonText('Añadir marcador');  // Texto normal para pantallas más grandes
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
                    <CardTitle>Marker menu</CardTitle>
                    <CardDescription>Añade tu marcador</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="font-bold">Añadir nuevo marcador</label>
                                <input
                                    type="text"
                                    value={newMarkerText}
                                    onChange={(e) => setNewMarkerText(e.target.value)}
                                    placeholder="Texto del marcador"
                                    className="border border-gray-300 p-2 w-full"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                {/* Categoría del marcador */}
                <div className="mb-4 p-6 pt-0">
                    <label className="font-bold mb-2">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 p-2 w-full mt-2"
                    >
                        <option>Restaurante</option>
                        <option>Alojamiento</option>
                        <option>Atracción</option>
                        <option>Compras</option>
                        <option>Transporte</option>
                    </select>
                </div>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={closeForm}>Cancel</Button>
                    <Button onClick={addMarker}>{buttonText}</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default MarkerFrom;
