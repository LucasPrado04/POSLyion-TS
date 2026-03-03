import React from 'react';
import Styles from '../Estilos/Body.module.css';

const Cuerpo: React.FC = () => {
  const handleHome = () => {
    // Aquí puedes poner la lógica de navegación
    console.log("Navegando al inicio...");
  };

 return (
  <div className={Styles.appContent}>
    {/* 1. EL SIDEBAR (Intocable) */}
    <aside className={Styles.sidebar}>
        <ul className={Styles.linkside}>
            <li className={Styles.btn1}><a href="#">Inicio</a></li>
            <li className={Styles.btn2}><a href="#">Productos</a></li>
            <li className={Styles.btn1}><a href="#">Proveedores</a></li>
            <li className={Styles.btn2}><a href="#">Estadisticas</a></li>

            {/* ... tus otros botones ... */}
        </ul>
    </aside>

    {/* 2. EL RESTO DE LA APP (Aquí hacés el lío de los paneles) */}
    <div className={Styles.seccionPrincipal}>
        
        {/* Sub-columna para Productos y Detalles */}
        <div className={Styles.columnaIzquierdaInterna}>
                <h2>Productos</h2>
            <main className={Styles.panelProductos}>
            </main>
                <h2>Detalles</h2>
            <section className={Styles.panelDetalles}>
            </section>
        </div>

        {/* Panel Lateral Derecho (el que se adapta) */}
        <div className={Styles.txtPanelLateral}>
            <h2>Panel Lateral</h2>
            <aside className={Styles.panelLateral}>
            </aside>
        </div>
    </div>
  </div>
);
};

export default Cuerpo;