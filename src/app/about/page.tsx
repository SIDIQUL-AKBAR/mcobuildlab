import { Info, Code, Shield, Heart, Globe, ExternalLink, Crown, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ADMINS = [
  {
    name: "Sidiqul Akbar",
    role: "Lead Architect & Developer",
    profile: "https://discord.com/users/1479018247692091495",
    description: "Visionary behind MCO Build Lab and founder of Master Coding Organisation."
  },
  {
    name: "William",
    role: "Honoured Administrator",
    profile: "https://discord.com/users/1387334583984328704",
    description: "Key strategic partner and administrative lead within the MCO ecosystem."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto space-y-12 pb-24">
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

      <section className="space-y-8">
        <div className="flex items-center gap-3 justify-center mb-8">
          <Crown className="w-6 h-6 text-accent" />
          <h2 className="text-3xl font-headline font-bold uppercase tracking-tighter">Honoured Administrators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADMINS.map((admin, i) => (
            <Card key={i} className="bg-card/40 border-accent/10 hover:border-accent/30 transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center relative">
                   <User className="w-10 h-10 text-accent" />
                   <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1 border-2 border-background">
                     <Star className="w-3 h-3 text-accent-foreground fill-current" />
                   </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{admin.name}</h3>
                  <Badge variant="outline" className="mt-1 border-accent/30 text-accent bg-accent/5 uppercase text-[10px] font-bold">
                    {admin.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {admin.description}
                </p>
                <Button asChild variant="ghost" className="text-accent hover:bg-accent/10 hover:text-accent gap-2">
                  <a href={admin.profile} target="_blank" rel="noopener noreferrer">
                    View Discord Profile <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
        <Card className="bg-card/40 border-accent/10">
          <CardContent className="p-8 space-y-4">
            <Code className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold uppercase tracking-tight">The Vision</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MCO Build Lab was conceived by <span className="text-accent font-bold">Sidiqul Akbar</span>. 
              The goal is to eliminate the complexity of manual server setup, providing a deterministic engine 
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
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-accent/10 text-muted-foreground">
        <p className="text-[10px] uppercase font-bold tracking-[0.4em]">Master Coding Organisation © 2024</p>
      </footer>
    </div>
  );
}
