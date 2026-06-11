import { Users, ExternalLink, Shield, Zap, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PARTNERS = [
  {
    name: "MCO Build Lab Official",
    description: "The primary hub for all Discord architects using MCO tools.",
    members: "15k+",
    tag: "Official",
    link: "https://mcobuildlab.base44.app"
  },
  {
    name: "Developer Haven",
    description: "A professional network for developers and community builders.",
    members: "5k+",
    tag: "Verified",
    link: "#"
  },
  {
    name: "Esports Hub",
    description: "Production-ready templates and support for competitive gaming nodes.",
    members: "2k+",
    tag: "Premium",
    link: "#"
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="bg-accent/20 p-3 rounded-2xl border border-accent/30">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-headline uppercase tracking-tighter">Partner Network</h1>
            <p className="text-muted-foreground uppercase text-[10px] tracking-[0.2em] mt-1">Verified Nodes & Alliances</p>
          </div>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          Connect with other professional communities that utilize MCO Build Lab infrastructure. 
          Explore, network, and grow within the MCO ecosystem.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PARTNERS.map((partner, i) => (
          <Card key={i} className="bg-card/40 border-accent/10 hover:border-accent/30 transition-all group">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="border-accent/20 text-accent bg-accent/5">{partner.tag}</Badge>
                <Star className="w-4 h-4 text-accent/20 group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{partner.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{partner.description}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-accent/5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{partner.members} Users</span>
                <Button asChild size="sm" variant="ghost" className="text-accent hover:bg-accent/10 gap-2">
                  <a href={partner.link} target="_blank" rel="noopener noreferrer">
                    Join <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-accent/5 border border-accent/10 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">Become a Partner</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Do you run a community architected by MCO? Apply for partnership to be featured in our global network.
          </p>
        </div>
        <Button className="bg-accent text-accent-foreground font-bold uppercase tracking-widest px-8">
          Apply Now
        </Button>
      </section>
    </div>
  );
}
