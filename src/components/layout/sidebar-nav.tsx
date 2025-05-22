"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  FileText,
  Sparkles,
} from 'lucide-react'; // Removed Settings icon as it's not used
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Painel Principal', icon: LayoutDashboard },
  { href: '/add-income', label: 'Adicionar Receita', icon: TrendingUp },
  { href: '/add-expense', label: 'Adicionar Despesa', icon: TrendingDown },
  { href: '/reports', label: 'Relatórios', icon: FileText },
  { href: '/ai-suggestions', label: 'Sugestões IA', icon: Sparkles },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
              className={cn(pathname === item.href ? 'bg-sidebar-primary text-sidebar-primary-foreground' : '')}
            >
              <a> 
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
