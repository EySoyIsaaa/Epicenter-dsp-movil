import { useState, useEffect, useCallback } from 'react';

export interface DownloadItem {
  id: string;
  fileName: string;
  timestamp: number;
  // En la versión móvil, solo guardaremos el nombre y la hora,
  // ya que el archivo real estará en el sistema de archivos nativo.
}

const STORAGE_KEY = 'epicenter_download_history';

export function useDownloadHistory() {
  const [history, setHistory] = useState<DownloadItem[]>([]);

  // Cargar historial al inicio
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading download history from localStorage:', error);
    }
  }, []);

  // Guardar historial en localStorage
  const saveHistory = useCallback((newHistory: DownloadItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving download history to localStorage:', error);
    }
  }, []);

  // Agregar un nuevo elemento al historial
  const addDownload = useCallback((fileName: string) => {
    const newItem: DownloadItem = {
      id: Date.now().toString(),
      fileName,
      timestamp: Date.now(),
    };
    
    setHistory(prevHistory => {
      const newHistory = [newItem, ...prevHistory];
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  // Limpiar todo el historial
  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return {
    history,
    addDownload,
    clearHistory,
  };
}
