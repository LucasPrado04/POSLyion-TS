import React, { useState } from 'react';
import Buscador from '../Common/search';
import Styles from '../Estilos/Body.module.css';
import ProductStyles from '../Estilos/Products.module.css';
import { Modal2 } from '../../ModalBuy';
import AgregarCompra from './emergentes/addbuys';
import {Plus,Trash2, Pencil, FilePenLine} from 'lucide-react';

const Compras: React.FC = () => {
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos de ejemplo
const productosData = [
    { id: 1, nombre: 'Manzana', stock: 50, precio: 150, proveedor: 'Sancor', categoria: 'Frutas' },
    { id: 2, nombre: 'Banana', stock: 30, precio: 100, proveedor: 'Sancor', categoria: 'Frutas' },
    { id: 3, nombre: 'Pera', stock: 20, precio: 120, proveedor: 'Sancor', categoria: 'Frutas' },
    { id: 4, nombre: 'Naranja', stock: 45, precio: 90, proveedor: 'Sancor', categoria: 'Frutas' },
    { id: 5, nombre: 'Limón', stock: 15, precio: 80, proveedor: 'Sancor', categoria: 'Frutas' },
    { id: 6, nombre: 'Uva', stock: 10, precio: 250, proveedor: 'Sancor', categoria: 'Frutas' },
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
        <h2>Compras</h2>
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
              <Modal2 onClose={() => setIsModalOpen(false)}>
                <AgregarCompra onSave={() => setIsModalOpen(false)} />
              </Modal2>
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
                  <span className={ProductStyles.colNombre}>{prod.proveedor}</span>
                  <span className={ProductStyles.colPrecio}>{prod.categoria}</span>

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

export default Compras;