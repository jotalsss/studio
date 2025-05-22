"use client"; 

import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import { LogOut } from 'lucide-react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true} collapsible="icon">
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                Conta Clara
             </h2>
            <SidebarTrigger className="hidden group-data-[collapsible=icon]:hidden md:flex" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-2">
           <Button variant="ghost" className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center">
             <LogOut size={18}/>
             <span className="group-data-[collapsible=icon]:hidden">Sair</span>
           </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
