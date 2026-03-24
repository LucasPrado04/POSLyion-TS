import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Styles from '../Estilos/Body.module.css';
import ProductStyles from '../Estilos/Products.module.css';
import BuscadorStyle from '../Estilos/Search.module.css';
import Buscador from '../Common/search';

const Cuerpo: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const handleHome = () => {
    // Aquí puedes poner la lógica de navegación
    console.log("Init");
  };

 return (
  <div className={Styles.contenedorPadre}>
    <div className={Styles.appContent}> 
      {/* Contenedor del buscador*/}
      <div className={Styles.seccionPrincipal}>
        <div className={BuscadorStyle.buscadorContainer}>
          <Buscador 
                  placeholder="Buscar producto por nombre o código" 
                  valor={filtro} 
                  onChange={setFiltro} 
                  />
        </div>
        {/* Contenedor de productos */}
          <div className={Styles.columnaIzquierdaInterna}>
            <h2>Productos</h2>
            {filtro.length > 0 && (
              <div className={ProductStyles.productos}>
                <p>{filtro}</p>
              </div>
            )}
            <div className={Styles.panelProductos}></div>
        </div> 
      </div>
      {/* Contenedor de panel lateral */}
      <div className={Styles.txtPanelLateral}>
        <h2>Panel Lateral</h2>
        <aside className={Styles.panelLateral}></aside>
      </div>
    </div>
    <footer>
      <div className={Styles.panelFooter}>
        <h1>Importe: $0.00</h1>
      </div>
    </footer>
  </div>
);
};


export default Cuerpo;