import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { List, Trash2, Download, Clock } from 'lucide-react';
import { useDownloadHistory, DownloadItem } from '@/hooks/useDownloadHistory';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Componente para un solo elemento de la lista
const DownloadListItem: React.FC<{ item: DownloadItem }> = ({ item }) => {
  // TODO: Implementar la lógica para abrir el archivo en el sistema nativo
  const handleOpen = () => {
    console.log(`Intentando abrir archivo: ${item.fileName}`);
    // Aquí se usaría un plugin de Capacitor para abrir el archivo
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-zinc-700 hover:bg-zinc-800 transition-colors rounded-md">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white truncate max-w-[200px]">{item.fileName}</span>
        <span className="text-xs text-zinc-400">
          {format(item.timestamp, 'dd MMM yyyy, HH:mm', { locale: es })}
        </span>
      </div>
      <Button variant="ghost" size="icon" onClick={handleOpen} title="Abrir Archivo">
        <Download className="w-5 h-5 text-green-400" />
      </Button>
    </div>
  );
};

export function DownloadDrawer() {
  const { history, clearHistory } = useDownloadHistory();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" title="Descargas">
          <List className="w-6 h-6 text-zinc-300" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[350px] bg-zinc-900 border-r border-zinc-700 p-0">
        <SheetHeader className="p-6 border-b border-zinc-700">
          <SheetTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-red-500" />
            Historial de Descargas
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-4 h-[calc(100vh-130px)] overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-10 text-zinc-500">
              <p>Aún no hay descargas.</p>
              <p>¡Procesa y descarga tu primer audio!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map(item => (
                <DownloadListItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-zinc-700 bg-zinc-900">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={clearHistory}
            disabled={history.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpiar Historial
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
