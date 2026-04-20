import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Buscador from '../Common/search';
import ProvStyles from '../Estilos/Proveedor.module.css';
import {Plus} from 'lucide-react';

const Proveedor: React.FC = () => {
  const [filtro, setFiltro] = useState('');

    return (
    <div>
      <div className={ProvStyles.txth2}>
        <h2>PROVEEDORES</h2>
      </div>
      <div className={ProvStyles.seccionPrincipal}>
        <div className={ProvStyles.gestionStock}>
          <div className={ProvStyles.buscadorcss}> 
            <Buscador 
              placeholder="Buscar proveedor por nombre" 
              valor={filtro} 
              onChange={setFiltro} 
              />
          </div>
          <div className={ProvStyles.botones}>
            <button className={ProvStyles.btnAdd}>
              <Plus size={30} color='green'/>
            </button>

          </div>  
        </div>
          {filtro.length > 0} 
        <div className={ProvStyles.productos}>
          <p>{filtro}</p>
        </div>
      </div>
    </div>
  );
};

export default Proveedor;