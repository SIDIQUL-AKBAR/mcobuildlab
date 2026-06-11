import { Users, ExternalLink, Shield, Zap, Globe, Star, CheckCircle2, Trophy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const PARTNERS = [
  {
    name: "MCO – Master Coding Organisation",
    description: "The primary architectural hub for all Discord developers using MCO technologies. Access exclusive blueprints and beta tools.",
    logo: "https://cdn.discordapp.com/icons/1369162397486678036/fc814990828cfbb862cff23d776018a5.webp",
    invite: "https://discord.gg/vNcpNQmAJH",
    tag: "Official Node",
    featured: true
  },
  {
    name: "Chill Verse",
    description: "A relaxed community space for hanging out and sharing interests in a structured, welcoming environment.",
    logo: "https://cdn.discordapp.com/icons/1510104114011308132/20838027e4af3b0563c2727730f60a3e.webp",
    invite: "https://discord.gg/A7vWEaEVk7",
    tag: "Verified Node",
    featured: false
  },
  {
    name: "Hangout Kerala",
    description: "The premium regional community for connections, discussions, and shared cultural growth.",
    logo: "https://cdn.discordapp.com/icons/1502513880503681085/8959ba860b5b772db1f0bf7332a75360.webp",
    invite: "https://discord.gg/tZQE3WYqQc",
    tag: "Verified Node",
    featured: false
  },
  {
    name: "Williams Group Chat Server",
    description: "An elite professional network focused on communication and high-performance server infrastructure.",
    logo: "https://cdn.discordapp.com/icons/1444037416003440737/541bf646430bd95c41d3a04f397a1f8b.webp",
    invite: "https://discord.gg/VvhDdK6YRG",
    tag: "Partner Node",
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
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-accent/20 bg-background/50">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <Badge variant="outline" className={`border-accent/20 text-accent bg-accent/5 px-3 py-1 ${partner.featured ? 'bg-accent/20 border-accent/40' : ''}`}>
                  {partner.tag}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-accent transition-colors">{partner.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed h-12 line-clamp-2 italic">{partner.description}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-accent/5">
                <Button asChild size="lg" variant={partner.featured ? "default" : "outline"} className={`font-bold uppercase tracking-widest px-8 rounded-xl w-full ${partner.featured ? 'bg-accent text-accent-foreground' : 'border-accent/20 text-accent hover:bg-accent/10'}`}>
                  <a href={partner.invite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Join Node <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-accent/5 border border-accent/10 rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center gap-10 justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-6 text-center md:text-left relative z-10">
          <div className="bg-accent/20 p-2 rounded-xl w-fit mx-auto md:mx-0">
             <Shield className="w-6 h-6 text-accent" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter">Become a Partner</h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Want to feature your community in our global network? Join the official <strong>Master Coding Organisation</strong> server and promote your community in our partnership channels.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-accent tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
               <CheckCircle2 className="w-3 h-3" /> Step 1: Join MCO Server
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-accent tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
               <CheckCircle2 className="w-3 h-3" /> Step 2: Promote Your Node
             </div>
          </div>
        </div>
        <div className="relative z-10">
          <Button asChild size="lg" className="bg-accent text-accent-foreground font-bold uppercase tracking-widest px-12 h-16 rounded-2xl shadow-xl shadow-accent/20 hover:scale-105 transition-transform group">
            <a href="https://discord.gg/vNcpNQmAJH" target="_blank" rel="noopener noreferrer">
              Join & Apply <MessageCircle className="w-5 h-5 ml-2 group-hover:animate-bounce" />
            </a>
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
