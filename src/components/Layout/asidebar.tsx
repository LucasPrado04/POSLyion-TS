import React from "react";
import { Link } from 'react-router-dom';
import Styles from '../Estilos/Navegacion.module.css';
import {Settings} from 'lucide-react';

const AsideBar: React.FC = () => {
  const handleHome = (e?: React.MouseEvent) => {
    e?.preventDefault();
    console.log("Navegando al inicio...");
  };

  // 1. EL SIDEBAR (Intocable)
  return (
    <aside className={Styles.sidebar}>
      <ul className={Styles.linkside}>
        <li className={Styles.btn1}><Link to="/">Inicio</Link></li>
        <li className={Styles.btn2}><Link to="/products">Productos</Link></li>
        <li className={Styles.btn1}><a href="#">Proveedores</a></li>
        <li className={Styles.btn2}><a href="#">Historial</a></li>
        <li className={Styles.btn1}><a href="#">Compras</a></li>
        <li className={Styles.btn2}><a href="#">Estadisticas</a></li>
        <li className={Styles.btn3}>
          <Link to="/config" className={Styles.configLink}>
            {/* Usamos el componente del icono.
               - size={20}: Define el tamaño (alto/ancho) en píxeles.
               - className: Para ajustar márgenes y colores en el CSS.
            */}
            <Settings size={30} className={Styles.settingsIcon} />
            {/* También puedes mantener el texto si quieres (opcional) */}
          </Link>
        </li>
        {/* ... tus otros botones ... */}
      </ul>
    </aside>
  );
}

export default AsideBar;