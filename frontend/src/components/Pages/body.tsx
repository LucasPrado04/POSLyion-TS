import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Styles from '../Estilos/Body.module.css';
import BuscadorStyle from '../Estilos/Search.module.css';
import Buscador from '../Common/search';

const Cuerpo: React.FC = () => {
  const [filtro, setFiltro] = useState('');

  const productosData = [
    { id: 1, nombre: 'Manzana', precio: 150, codigo: '001' },
    { id: 2, nombre: 'Banana', precio: 100, codigo: '002' },
    { id: 3, nombre: 'Pera', precio: 120, codigo: '003' },
  ];

  const productosFiltrados = productosData.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
    p.codigo.includes(filtro)
  );

  return (
    <div className={Styles.contenedorPadre}>
      <div className={Styles.appContent}> 
        <div className={Styles.seccionPrincipal}>
          <div className={BuscadorStyle.buscadorContainer}>
            <Buscador 
              placeholder="Buscar producto por nombre o código" 
              valor={filtro} 
              onChange={setFiltro} 
            />
          </div>

          <div className={Styles.columnaIzquierdaInterna}>
            <h2>Productos</h2>
            
            <div className={Styles.panelProductos}>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((prod) => (
                  // Cambiamos el div por un button
                  <button 
                    key={prod.id} 
                    className={Styles.itemProductoBtn} // Nueva clase para el botón
                    onClick={() => console.log(`Agregado: ${prod.nombre}`)}
                  >
                    <div className={Styles.infoProducto}>
                      <span className={Styles.nameProd}>{prod.nombre}</span>
                      <span className={Styles.precioProd}>${prod.precio}</span>
                    </div>
                    <span className={Styles.plusIcon}>+</span> 
                  </button>
                ))
              ) : (
                <p>No se encontraron productos</p>
              )}
            </div>
          </div> 
        </div>

        <div className={Styles.txtPanelLateral}>
          <h2>Resumen Venta</h2>
          <aside className={Styles.panelLateral}></aside>
        </div>
      </div>

      <footer className={Styles.panelFooter}>
        <h1>Importe: $0.00</h1>
      </footer>
    </div>
  );
};


export default Cuerpo;