'use client';

import { SignedIn, SignedOut } from '@/services/clerk/components/SignInStatus';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

export function SidebarNavMenuGroup({
  items,
  className,
}: {
  items: {
    href: string;
    icon: ReactNode;
    label: string;
    authStatus?: 'signedIn' | 'signedOut';
  }[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className={className}>
      <SidebarMenu>
        {items.map(({ authStatus, href, icon, label }) => {
          const html = (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild isActive={pathname === href}>
                <Link href={href}>
                  {icon}
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
          if (authStatus === 'signedIn') {
            return <SignedIn key={href}>{html}</SignedIn>;
          }
          if (authStatus === 'signedOut') {
            return <SignedOut key={href}>{html}</SignedOut>;
          }
          return html;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
