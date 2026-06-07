import WizardForm from '@/components/WizardForm';
import { LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen blueprint-grid relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-primary/20 p-3 rounded-2xl border border-primary/30">
              <LayoutDashboard className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              GuildArchitect AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional Discord Server Architect. Designing scalable, production-ready communities through intelligent blueprints.
          </p>
        </header>

        <section className="relative z-10">
          <WizardForm />
        </section>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
}
