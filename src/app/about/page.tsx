import { Info, Code, Shield, Heart, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="bg-accent/10 p-4 rounded-3xl w-fit mx-auto border border-accent/20">
          <Info className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-5xl font-bold font-headline uppercase tracking-tighter">About MCO Build Lab</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          The industry standard for professional Discord server architecture. 
          Developed by Master Coding Organisation to empower community leaders.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/40 border-accent/10">
          <CardContent className="p-8 space-y-4">
            <Code className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold uppercase tracking-tight">The Visionary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MCO Build Lab was conceived and developed by <span className="text-accent font-bold">Sidiqul Akbar</span>. 
              The goal was to eliminate the complexity of manual server setup, providing a deterministic engine 
              for generating high-quality Discord infrastructures.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-accent/10">
          <CardContent className="p-8 space-y-4">
            <Shield className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Our Organisation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-accent font-bold">Master Coding Organisation (MCO)</span> is an elite developer collective 
              focused on building high-performance tools for digital communities and developers worldwide.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="bg-accent/5 border border-accent/10 rounded-3xl p-10 space-y-6 text-center">
        <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter">Join Our Ecosystem</h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          MCO Build Lab is just one part of the Master Coding Organisation network. 
          Connect with us to access more professional building tools.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-accent text-accent-foreground">
            <a href="https://mcobuildlab.base44.app" target="_blank" rel="noopener noreferrer">
              Official Builder Tool <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button variant="outline" className="border-accent/30 text-accent">
            Contact Support
          </Button>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-accent/10 text-muted-foreground">
        <p className="text-[10px] uppercase font-bold tracking-[0.4em]">Master Coding Organisation © 2024</p>
      </footer>
    </div>
  );
}
