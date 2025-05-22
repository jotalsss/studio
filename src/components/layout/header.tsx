
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react'; 
import { GlobalMonthFilter } from './global-month-filter';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 md:gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      <SidebarTrigger className="md:hidden" /> 
      <div className="flex flex-1 items-center justify-between gap-4">
        {/* Título é opcional se o filtro ocupar muito espaço em mobile, mas vamos tentar mantê-lo */}
        <h1 className="text-lg font-semibold text-primary hidden sm:block">Conta Clara</h1>
        
        <div className="flex-1 flex justify-center sm:justify-start max-w-xs">
         <GlobalMonthFilter />
        </div>

        <Button variant="ghost" size="icon" className="ml-auto">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Perfil do Usuário</span>
        </Button>
      </div>
    </header>
  );
}
