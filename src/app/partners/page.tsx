import { Users, ExternalLink, Shield, Zap, Globe, Star, CheckCircle2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PARTNERS = [
  {
    name: "MCO Build Lab Official",
    description: "The primary architectural hub for all Discord developers using MCO technologies. Access exclusive blueprints and beta tools.",
    members: "15.4k",
    tag: "Official Node",
    link: "https://mcobuildlab.base44.app",
    featured: true
  },
  {
    name: "Developer Haven",
    description: "An elite professional network for community builders and software engineers focused on high-performance infrastructure.",
    members: "5.2k",
    tag: "Verified Node",
    link: "#",
    featured: false
  },
  {
    name: "Global Esports Network",
    description: "The industry standard for competitive gaming server structures. Architected entirely using MCO Build Lab protocols.",
    members: "28.9k",
    tag: "Premium Node",
    link: "#",
    featured: false
  },
  {
    name: "AI Research Collective",
    description: "A collaborative space for AI enthusiasts and researchers. Built with advanced security and categorization logic.",
    members: "3.1k",
    tag: "Verified Node",
    link: "#",
    featured: false
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-12 pb-24">
      <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-4">
          <div className="bg-accent/20 p-3 rounded-2xl border border-accent/30 shadow-lg shadow-accent/10">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline uppercase tracking-tighter">Partner Network</h1>
            <p className="text-accent uppercase text-[10px] font-bold tracking-[0.3em] mt-1">Master Coding Organisation Verified Nodes</p>
          </div>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Connect with the global network of professional communities architected by <strong>MCO Build Lab</strong>. 
          Our partners represent the gold standard in Discord community management and infrastructure design.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {PARTNERS.map((partner, i) => (
          <Card key={i} className={`bg-card/40 border-accent/10 hover:border-accent/30 transition-all group overflow-hidden relative ${partner.featured ? 'ring-1 ring-accent/30' : ''}`}>
            {partner.featured && (
              <div className="absolute top-0 right-0 p-3">
                <Trophy className="w-5 h-5 text-accent animate-pulse" />
              </div>
            )}
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={`border-accent/20 text-accent bg-accent/5 px-3 py-1 ${partner.featured ? 'bg-accent/20 border-accent/40' : ''}`}>
                  {partner.tag}
                </Badge>
                <CheckCircle2 className={`w-5 h-5 transition-colors ${partner.featured ? 'text-accent' : 'text-accent/20 group-hover:text-accent'}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-accent transition-colors">{partner.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed h-12 line-clamp-2 italic">{partner.description}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-accent/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Active Nodes</span>
                  <span className="text-lg font-bold">{partner.members}</span>
                </div>
                <Button asChild size="lg" variant={partner.featured ? "default" : "outline"} className={`font-bold uppercase tracking-widest px-8 rounded-xl ${partner.featured ? 'bg-accent text-accent-foreground' : 'border-accent/20 text-accent hover:bg-accent/10'}`}>
                  <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Join Node <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-accent/5 border border-accent/10 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-10 justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-4 text-center md:text-left relative z-10">
          <div className="bg-accent/20 p-2 rounded-xl w-fit mx-auto md:mx-0">
             <Shield className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter">Apply for Partnership</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Does your community maintain the architectural standards of the <strong>Master Coding Organisation</strong>? 
            Apply today to feature your node in our global network and gain access to premium building assets.
          </p>
        </div>
        <div className="relative z-10">
          <Button size="lg" className="bg-accent text-accent-foreground font-bold uppercase tracking-widest px-12 h-16 rounded-2xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform">
            Submit Application
          </Button>
        </div>
      </section>

      <footer className="text-center pt-12 border-t border-accent/10 text-muted-foreground">
        <p className="text-[10px] uppercase font-bold tracking-[0.5em] mb-2 opacity-60">Master Coding Organisation</p>
        <p className="text-[8px] uppercase tracking-widest opacity-30">Developed by Sidiqul Akbar © 2024</p>
      </footer>
    </div>
  );
}
