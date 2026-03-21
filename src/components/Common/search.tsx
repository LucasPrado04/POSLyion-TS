import React from 'react';
import styles from '../Estilos/Search.module.css';

interface BuscadorProps {
  placeholder: string;
  valor: string;
  onChange: (nuevoValor: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ placeholder, valor, onChange }) => {
  return (
    <div className={styles.contenedorBusqueda}>
      <input
        type="text"
        className={styles.inputBusqueda}
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Podrías agregar un ícono de lupa acá después */}
    </div>
  );
};

export default Buscador;