"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Home, 
  Zap, 
  Users, 
  Info, 
  Menu, 
  X, 
  ExternalLink,
  Github,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const NAV_ITEMS = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Architect', icon: Zap, href: '/architect' },
  { name: 'Partners', icon: Users, href: '/partners' },
  { name: 'About', icon: Info, href: '/about' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background blueprint-grid">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-accent/10 bg-card/30 backdrop-blur-xl sticky top-0 h-screen z-50">
        <div className="p-6 border-b border-accent/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-accent/20 p-2 rounded-xl border border-accent/30">
              <LayoutGrid className="w-5 h-5 text-accent" />
            </div>
            <span className="font-headline font-bold text-lg tracking-tight uppercase">MCO Build Lab</span>
          </Link>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  pathname === item.href 
                    ? "bg-accent/10 text-accent border border-accent/20" 
                    : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", pathname === item.href && "text-accent")} />
                <span className="text-sm font-medium tracking-wide uppercase text-[11px]">{item.name}</span>
                {pathname === item.href && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-6 border-t border-accent/10 bg-accent/5">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Master Coding Organisation</p>
          <p className="text-[8px] text-muted-foreground/40 uppercase tracking-widest">Dev: Sidiqul Akbar</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 w-full border-b border-accent/10 bg-background/50 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden lg:block">
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                  Infrastructure Management System v2.0
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="hidden sm:flex border-accent/20 hover:bg-accent/10 text-accent gap-2">
                <a href="https://mcobuildlab.base44.app" target="_blank" rel="noopener noreferrer">
                  Official Builder <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Link href="/architect">
                <Button size="sm" className="bg-accent text-accent-foreground shadow-lg shadow-accent/20 font-bold text-[10px] uppercase tracking-widest">
                  Start Architect
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 relative">
          {children}
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm lg:hidden">
          <aside className="fixed inset-y-0 left-0 w-72 bg-card border-r border-accent/10 p-6 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-xl border border-accent/30">
                  <LayoutGrid className="w-5 h-5 text-accent" />
                </div>
                <span className="font-headline font-bold text-lg uppercase">MCO Lab</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                    pathname === item.href 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4 bg-accent/5 rounded-2xl border border-accent/10">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Master Coding Organisation</p>
              <p className="text-[8px] text-muted-foreground mt-1 uppercase">Dev: Sidiqul Akbar</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
