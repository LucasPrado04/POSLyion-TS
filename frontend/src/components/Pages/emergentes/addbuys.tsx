import React from 'react';
import Styles from '../../Estilos/addBuy.module.css';

const AddBuys = ({ onSave }: { onSave?: () => void }) => {
  return (
    <div className={Styles.contenedor}>
        <h2>Nueva Compra</h2>
      <form>
        <div className={Styles.formContainer}>
            <div className={Styles.divContainer}>
                <h2>Codigo de barras</h2>
                <input type="text" placeholder="Código del producto" />
                <h2>Nombre del producto</h2>
                <input type="text" placeholder="Nombre del producto"  />
                <h2>Descripción</h2>
                <input type="text" placeholder="Descripción" />
            </div>
            <div className={Styles.divContainer}>
                <h2>Precio de compra</h2>
                <input type="number" placeholder="Precio de compra"/>
                <h2>Precio de venta (publico general)</h2>
                <input type="number" placeholder="Precio de venta 1"/>
                <h2>Precio de venta (Plataformas adicionales)</h2>
                <input type="number" placeholder="Precio de venta 2" />
                <h2>Precio de venta (Plataformas adicionales)</h2>
                <input type="number" placeholder= "Precio de venta 3" />
            </div>
            <div className={Styles.divContainer}>
                <h2>Stock</h2>
                <input type="number" placeholder="Stock" disabled/>
                <h2>Categoría</h2>
                <input type="text" placeholder="Categoría" />
            </div>
        </div>
        <div>
            <button type="button" onClick={onSave}>
            Guardar Producto
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddBuys;