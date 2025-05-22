"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react'; 

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      <SidebarTrigger className="md:hidden" /> 
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Conta Clara</h1>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Perfil do Usuário</span>
        </Button>
      </div>
    </header>
  );
}
