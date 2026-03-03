import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Layout/navbar';
import Cuerpo from './components/Layout/body';
import Styles from './components/Estilos/Body.module.css'
import styles from './components/Estilos/Navbar.module.css'

const App = () => (
  <div className={Styles.mainLayout}>
    <Navbar />
    <Cuerpo />
  </div>
);

// Buscamos el div con id "root" y renderizamos la app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}