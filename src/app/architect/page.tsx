import WizardForm from '@/components/WizardForm';
import { LayoutGrid, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ArchitectPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-accent/10 text-accent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold font-headline uppercase tracking-tighter">System Architect</h1>
            </div>
            <p className="text-muted-foreground text-sm uppercase tracking-widest opacity-60">Phase: Infrastructure Configuration</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-2xl">
            <LayoutGrid className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold uppercase text-accent tracking-widest">Master Coding Organisation</span>
          </div>
        </header>

        <section className="relative z-10">
          <WizardForm />
        </section>
      </div>
    </div>
  );
}
