import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import StylesHistorial from '../Estilos/historial.module.css';

export const Historial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={StylesHistorial.contenedorHistorial}>
      <div className={StylesHistorial.tituloHistorial}>
        <h2>HISTORIAL</h2>
      </div>

      <div className={StylesHistorial.controlesFiltrado}>
        <div className={StylesHistorial.dropdownContainer}>
            <button className={StylesHistorial.dropdownButton} onClick={toggleDropdown}>
            Seleccionar Categoría
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
            <div className={StylesHistorial.setDrops}>
                <ul className={StylesHistorial.listaDrops}>
                <li>Compras</li>
                <li>Ventas</li>
                <li>Devoluciones</li>
                </ul>
            </div>
            )}
        </div>

        <div className={StylesHistorial.calendarioContainer}>
            <p>Desde:</p>
            <input 
            type="date" 
            className={StylesHistorial.inputCalendario} 
            />
        </div>
        <div className={StylesHistorial.calendarioContainer}>
            <p>Hasta:</p>
            <input 
            type="date" 
            className={StylesHistorial.inputCalendario} 
            />
        </div>

        </div>
      <div className={StylesHistorial.historial}>

      </div>
    </div>
  );
};

export default Historial;