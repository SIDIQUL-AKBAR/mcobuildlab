import WizardForm from '@/components/WizardForm';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen blueprint-grid relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-accent/20 p-3 rounded-2xl border border-accent/30">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-accent bg-clip-text text-transparent uppercase font-headline">
              MCO Build Lab
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Professional Discord Server Architect & Infrastructure Designer. 
            Generating production-ready blueprints for elite communities.
          </p>
          <div className="flex justify-center">
            <Button asChild variant="outline" className="border-accent/30 hover:bg-accent/10 text-accent gap-2">
              <a href="https://mcobuildlab.base44.app" target="_blank" rel="noopener noreferrer">
                Try the Discord Server Builder <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </header>

        <section className="relative z-10">
          <WizardForm />
        </section>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </main>
  );
}
