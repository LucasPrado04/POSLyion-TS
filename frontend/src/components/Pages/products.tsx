import React, { useState } from 'react';
import Buscador from '../Common/search';
import Styles from '../Estilos/Body.module.css';
import ProductStyles from '../Estilos/Products.module.css';

import {Plus,Trash2, Pencil, FilePenLine} from 'lucide-react';

const Products: React.FC = () => {
  const [filtro, setFiltro] = useState('');

  return (
    <div>
      <div className={ProductStyles.txth2}>
        <h2>PRODUCTOS</h2>
      </div>
      <div className={ProductStyles.seccionPrincipal}>
        <div className={ProductStyles.gestionStock}>
          <div className={ProductStyles.buscadorcss}> 
            <Buscador 
              placeholder="Buscar producto por nombre o código" 
              valor={filtro} 
              onChange={setFiltro} 
              />
          </div>
          <div className={ProductStyles.botones}>
            <button className={ProductStyles.btnAdd}>
              <Plus size={30} color='green'/>
            </button>
            {/*}
              <button className={ProductStyles.btnEdit}>
              <Pencil size={30} color='#0062ff'/>
              </button>
              <button className={ProductStyles.btnDelete} type="button">
              <Trash2 size={30} color='#800000'/>
              </button>
            */}
          </div>  
        </div>
          {/*(filtro.length > 0) verifica si hay caracteres.
            Si es verdadero, renderiza lo que sigue después del && 
            */}
          {filtro.length > 0} 
        <div className={ProductStyles.productos}>
          <p>{filtro}</p>
        </div>
      </div>
    </div>
  );
};


export default Products;