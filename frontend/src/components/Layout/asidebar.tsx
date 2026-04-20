import React from "react";
import { Link } from 'react-router-dom';
import Styles from '../Estilos/Navegacion.module.css';
import {Settings} from 'lucide-react';

const AsideBar: React.FC = () => {
  const handleHome = (e?: React.MouseEvent) => {
    e?.preventDefault();
    console.log("Navegando al inicio...");
  };

  // SIDEBAR
  return (
    <aside className={Styles.sidebar}>
      <ul className={Styles.linkside}>
        <li className={Styles.btn1}><Link to="/">Inicio</Link></li>
        <li className={Styles.btn2}><Link to="/products">Productos</Link></li>
        <li className={Styles.btn1}><Link to="/proveedor">Proveedores</Link></li>
        <li className={Styles.btn2}><Link to="/historial">Historial</Link></li>
        <li className={Styles.btn1}><Link to="/compras">Compras</Link></li>
        <li className={Styles.btn2}><a href="#">Estadisticas</a></li>
        <div>
        <li className={Styles.btn3}>
          <Link to="/config" className={Styles.configLink}>
            <Settings size={30} className={Styles.settingsIcon} />
          </Link>
        </li>
        </div>
      </ul>
    </aside>
  );
}

export default AsideBar;