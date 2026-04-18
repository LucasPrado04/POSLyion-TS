import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Layout/navbar';
import AsideBar from './components/Layout/asidebar';

// Páginas
import Products from './components/Pages/products';
import Cuerpo from './components/Pages/body';
import Proveedor from './components/Pages/proveedor';
import Historial from './components/Pages/historial';
import Compras from './components/Pages/compras'

// Estilos
import Styles from './components/Estilos/Body.module.css';
import './components/Estilos/Navegacion.module.css';
import './components/Estilos/Products.module.css';
import './components/Estilos/Proveedor.module.css';
import './components/Estilos/add.module.css';

// Emergentes
import Agregar from './components/Pages/emergentes/addprods';
import AgregarCompra from './components/Pages/emergentes/addbuys'

const App = () => (
  <Router>
    {/* Layout Principal Vertical */}
    <div className={Styles.mainLayout} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      <Navbar />

      {/* Contenedor Horizontal para Aside + Contenido */}
      <div className={Styles.mainContainer}> 
        <AsideBar />
        
        <main className={Styles.contentArea}>
          <Routes>
            <Route path="/" element={<Cuerpo />} />
            <Route path="/products" element={<Products />} />
            <Route path="/proveedor" element={<Proveedor />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/compras" element={<Compras />}></Route>
            <Route path="/agregar" element={<Agregar />} />
            <Route path="/agregarCompra" element={<AgregarCompra />}></Route>
          </Routes>
        </main>
      </div>

    </div>
  </Router>
);

// Renderizado de la aplicación en el DOM
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}