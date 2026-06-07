"use client";

import React from 'react';
import { GenerateDiscordServerStructureOutput } from '@/ai/flows/generate-discord-server-structure-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Hash, 
  Volume2, 
  Bot, 
  Users, 
  Download, 
  RefreshCw, 
  Settings, 
  Zap,
  Lock,
  MessageSquare,
  FileJson,
  LayoutTemplate
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServerResultProps {
  data: GenerateDiscordServerStructureOutput;
  onReset: () => void;
}

export default function ServerResult({ data, onReset }: ServerResultProps) {
  const { toast } = useToast();
  
  const handleExport = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.server_info.name.replace(/\s+/g, '_').toLowerCase()}_blueprint.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Architecture Exported",
      description: "MCO Build AI JSON has been downloaded.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-accent/20 pb-8">
        <div>
          <h1 className="text-5xl font-bold text-accent font-headline tracking-tighter uppercase">{data.server_info.name}</h1>
          <p className="text-muted-foreground mt-2 uppercase tracking-widest text-xs">
            Infrastructure Status: <span className="text-accent">Production Ready</span> • {data.analysis.complexity} Tier
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2 border-accent/30 hover:bg-accent/10">
            <RefreshCw className="w-4 h-4" /> Re-Architect
          </Button>
          <Button onClick={handleExport} className="bg-accent text-accent-foreground flex items-center gap-2 shadow-lg shadow-accent/20">
            <FileJson className="w-4 h-4" /> Export JSON
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Network Scale', value: data.server_info.size, icon: Users },
          { label: 'Security Level', value: data.analysis.security_baseline, icon: Shield },
          { label: 'Vertical', value: data.server_info.type, icon: Zap },
          { label: 'Complexity', value: data.analysis.complexity, icon: LayoutTemplate },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/40 border-accent/10 hover:border-accent/30 transition-all">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <stat.icon className="w-3 h-3 text-accent" /> {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="architecture" className="space-y-6">
        <TabsList className="bg-secondary/30 p-1 border border-accent/10 w-full flex overflow-x-auto no-scrollbar justify-start">
          <TabsTrigger value="architecture" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Core Architecture</TabsTrigger>
          <TabsTrigger value="hierarchy">Role Hierarchy</TabsTrigger>
          <TabsTrigger value="channels">Channels & Categories</TabsTrigger>
          <TabsTrigger value="automation">Automation & Bots</TabsTrigger>
          <TabsTrigger value="protocols">Security Protocols</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture">
          <Card className="bg-card/40 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline uppercase">Infrastructural Overview</CardTitle>
              <CardDescription>Strategic deployment roadmap for the {data.server_info.name} node.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Onboarding Flow
                    </h3>
                    <div className="flex gap-2">
                      {data.onboarding_setup.flow.map((step: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <Badge variant="outline">{step}</Badge>
                          {i < data.onboarding_setup.flow.length - 1 && <span className="text-muted-foreground">→</span>}
                        </div>
                      ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Growth Logic
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{data.growth_features.overview}</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hierarchy">
          <Card className="bg-card/40 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline uppercase">Administrative & Member Roles</CardTitle>
              <CardDescription>Managed permission sets and visual identifier stacks.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.roles.map((role, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-secondary/10 rounded-xl border border-accent/5 hover:border-accent/20 transition-all">
                    <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: role.color }} />
                    <div className="flex-1">
                       <h4 className="font-bold uppercase tracking-tight" style={{ color: role.color }}>{role.name}</h4>
                       <div className="flex gap-2 mt-1">
                          {role.permissions.map((p: string) => <Badge key={p} variant="secondary" className="text-[9px] uppercase">{p}</Badge>)}
                          {role.hoist && <Badge className="text-[9px] bg-accent/20 text-accent border-accent/30">HOISTED</Badge>}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
           <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/40 border-accent/10">
                <CardHeader>
                   <CardTitle className="text-xs uppercase text-accent font-bold">Category Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                      {data.categories.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-accent/5">
                           <span className="font-bold text-xs uppercase tracking-widest">{cat.name}</span>
                           <Badge variant="outline" className="text-[10px]">POS: {cat.position}</Badge>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>
              <Card className="bg-card/40 border-accent/10">
                <CardHeader>
                   <CardTitle className="text-xs uppercase text-accent font-bold">Standard Channels</CardTitle>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-[400px]">
                      <div className="space-y-2 pr-4">
                        {data.channels.map((chan, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                             <span className="text-sm flex items-center gap-2">
                               <Hash className="w-3 h-3 text-accent" /> {chan.name}
                             </span>
                             <Badge className="text-[9px] uppercase" variant="secondary">{chan.category}</Badge>
                          </div>
                        ))}
                      </div>
                   </ScrollArea>
                </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="grid md:grid-cols-2 gap-6">
            {data.recommended_bots.map((bot, idx) => (
              <Card key={idx} className="bg-card/40 border-accent/10 hover:border-accent/30 transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-accent/20 p-3 rounded-2xl">
                    <Bot className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold uppercase">{bot.name}</CardTitle>
                    <CardDescription className="text-xs">{bot.purpose}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protocols">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/40 border-accent/10">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-sm uppercase">
                    <Shield className="w-4 h-4 text-accent" /> Moderation Core
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <label className="text-[10px] uppercase text-muted-foreground font-bold">Security Level</label>
                    <p className="font-bold text-accent">{data.security_system.level}</p>
                 </div>
                 <div className="flex justify-between p-3 bg-secondary/10 rounded-lg">
                    <span className="text-xs">Anti-Spam</span>
                    <Badge variant={data.security_system.anti_spam ? 'default' : 'outline'}>
                      {data.security_system.anti_spam ? 'ACTIVE' : 'OFF'}
                    </Badge>
                 </div>
                 <div className="flex justify-between p-3 bg-secondary/10 rounded-lg">
                    <span className="text-xs">Anti-Raid</span>
                    <Badge variant={data.security_system.anti_raid ? 'default' : 'outline'}>
                      {data.security_system.anti_raid ? 'ACTIVE' : 'OFF'}
                    </Badge>
                 </div>
              </CardContent>
            </Card>
            <Card className="bg-card/40 border-accent/10">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-sm uppercase">
                    <MessageSquare className="w-4 h-4 text-accent" /> Verification
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                    <label className="text-[10px] uppercase text-muted-foreground font-bold">Method</label>
                    <p className="font-bold text-accent">{data.verification_system.method}</p>
                 </div>
                 <div className="p-3 bg-secondary/10 rounded-lg border border-accent/5">
                    <label className="text-[10px] uppercase text-muted-foreground font-bold">Landing Zone</label>
                    <p className="text-xs">#{data.channels.find(c => c.type === 'welcome')?.name || 'verify'}</p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
