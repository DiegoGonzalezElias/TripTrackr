import React, { useEffect, useRef } from 'react';

interface MarkerFormProps {
    newMarkerText: string;
    setNewMarkerText: (value: React.SetStateAction<string>) => void;
    addMarker: () => void;
    closeForm: () => void;  // Nueva función para cerrar el formulario
}

function MarkerFrom({ newMarkerText, setNewMarkerText, addMarker, closeForm }: MarkerFormProps) {
    const formRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={formRef} className="relative">
            {/* Botón de cerrar (X) */}
            <button
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 font-bold"
                onClick={closeForm}
            >
                X
            </button>

            <h3 className="font-bold mb-2">Añadir nuevo marcador</h3>
            <input
                type="text"
                value={newMarkerText}
                onChange={(e) => setNewMarkerText(e.target.value)}
                placeholder="Texto del marcador"
                className="border border-gray-300 p-2 w-full mb-2"
            />
            <button
                onClick={addMarker}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Añadir marcador
            </button>
        </div>
    );
}

export default MarkerFrom;
