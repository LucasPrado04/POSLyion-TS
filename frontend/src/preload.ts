import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  enviarNuevoProducto: (producto: any) => ipcRenderer.send('guardar-producto', producto),
  abrirVentana: () => ipcRenderer.send('abrir-ventana-productos'),
  obtenerRutaBase: () => ipcRenderer.invoke('get-app-path')
});