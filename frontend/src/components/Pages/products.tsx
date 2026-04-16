import React, { useState } from 'react';
import Buscador from '../Common/search';
import Styles from '../Estilos/Body.module.css';
import ProductStyles from '../Estilos/Products.module.css';
import { Modal } from '../../Modal';
import Agregar from './emergentes/addprods';
import {Plus,Trash2, Pencil, FilePenLine} from 'lucide-react';

const Products: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo
  const productosData = [
    { id: 1, nombre: 'Manzana', stock: 50, precio: 150 },
    { id: 2, nombre: 'Banana', stock: 30, precio: 100 },
    { id: 3, nombre: 'Pera', stock: 20, precio: 120 },
    { id: 4, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 4, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 5, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 6, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 7, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 8, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 9, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 10, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 11, nombre: 'Naranja', stock: 45, precio: 90 },
    { id: 12, nombre: 'Naranja', stock: 45, precio: 90 },
  ];

  const productosFiltrados = productosData.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleOpen = () => {
  // @ts-ignore (Si no definiste el type global)
  window.electron.abrirVentana();
};

  return (
    <div className={ProductStyles.contenedor}>
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
            <button className={ProductStyles.btnAdd} onClick={() => setIsModalOpen(true)}><Plus size={30} color='green'/></button>
            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <Agregar onSave={() => setIsModalOpen(false)} />
              </Modal>
            )}
          </div>
        </div>

        {/* Contenedor Principal de la Lista */}
        <div className={ProductStyles.productos}>
          <div className={ProductStyles.listaInterna}>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((prod) => (
                <div key={prod.id} className={ProductStyles.filaIntercalada}>
                  
                  {/* Repartimos los datos a lo largo de la fila */}
                  <span className={ProductStyles.colNombre}>{prod.nombre}</span>
                  <span className={ProductStyles.colStock}>Stock: {prod.stock}</span>
                  <span className={ProductStyles.colPrecio}>${prod.precio}</span>
                  
                  <div className={ProductStyles.colAcciones}>
                    <button className={ProductStyles.btnEdit} title="Editar">
                      <Pencil size={18} />
                    </button>
                    <button className={ProductStyles.btnDelete} title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                </div>
              ))
            ) : (
              <p className={ProductStyles.sinResultados}>Sin coincidencias</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;