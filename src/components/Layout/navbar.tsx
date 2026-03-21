import React, { useState } from 'react'; // Importamos useState
import styles from '../Estilos/Navbar.module.css';
import logo from '../img/logo.jpeg';

const Navbar: React.FC = () => {
  // Estado para controlar si el menú está abierto
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleHome = () => {
    console.log("Navegando al inicio...");
  };

  // Función para alternar el menú
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <button className={styles.logoButton} onClick={handleHome}>
        <img src={logo} alt="POSLyionApp Logo" className={styles.logoImage} />
        <h1>POSLyion</h1>
      </button>
      
      <ul className={styles.navLinks}>
        <li className={styles.dropdownContainer}>
          <button className={styles.dropbtn} onClick={toggleDropdown}>
            (NOMBREACA) ▼
          </button>
          
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li><a href="#">Perfil</a></li>
              <li><a href="#">Ajustes</a></li>
              <li><hr className={styles.divider} /></li>
              <li><a href="#" className={styles.logout}>Salir</a></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;