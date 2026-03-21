import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Layout/navbar';
import AsideBar from './components/Layout/asidebar';

// Páginas
import Products from './components/Pages/products';
import Cuerpo from './components/Pages/body';

// Estilos
import Styles from './components/Estilos/Body.module.css';
import './components/Estilos/Navegacion.module.css';


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