// src/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // En lugar de usar path acá, simplemente exponés funciones de envío
  enviarNuevoProducto: (producto: any) => ipcRenderer.send('guardar-producto', producto),
  
  abrirVentana: () => ipcRenderer.send('abrir-ventana-productos'),

  // Si necesitás una ruta de carpeta, pedila al proceso principal
  // No intentes construirla acá con 'path'
  obtenerRutaBase: () => ipcRenderer.invoke('get-app-path')
});