"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  FileText,
  Sparkles,
  Settings, // Added Settings icon
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/add-income', label: 'Add Income', icon: TrendingUp },
  { href: '/add-expense', label: 'Add Expense', icon: TrendingDown },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/ai-suggestions', label: 'AI Suggestions', icon: Sparkles },
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
              <a> {/* <a> tag needed for legacyBehavior with asChild on SidebarMenuButton */}
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
