"use client";

import React, { useState } from 'react';
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
  CheckCircle2, 
  Zap,
  Lock,
  MessageSquare
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
      title: "Blueprint Exported",
      description: "Server configuration JSON has been downloaded.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-accent font-headline">{data.server_info.name}</h1>
          <p className="text-muted-foreground mt-1">Architecture Blueprint v1.0 • {data.server_info.style} Aesthetic</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Start Over
          </Button>
          <Button onClick={handleExport} className="bg-accent text-accent-foreground flex items-center gap-2">
            <Download className="w-4 h-4" /> Export JSON
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/40 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" /> Community Scale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.server_info.size}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security Protocol
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.server_settings.verification_level}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/40 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" /> Primary Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.server_info.type}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 border border-border w-full flex overflow-x-auto no-scrollbar justify-start">
          <TabsTrigger value="overview">Architecture Overview</TabsTrigger>
          <TabsTrigger value="channels">Channels & Categories</TabsTrigger>
          <TabsTrigger value="roles">Role Hierarchy</TabsTrigger>
          <TabsTrigger value="bots">Automation Stack</TabsTrigger>
          <TabsTrigger value="security">Security & Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle>Architectural Analysis</CardTitle>
              <CardDescription>Strategic overview of your community structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 p-6 rounded-2xl border border-primary/10 leading-relaxed">
                {data.server_info.description}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-accent" /> Growth Strategy</h3>
                  <p className="text-muted-foreground text-sm">{data.growth_features.overview}</p>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {data.growth_features.community_engagement_strategies}
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Lock className="w-5 h-5 text-accent" /> Security Philosophy</h3>
                  <p className="text-muted-foreground text-sm">{data.security_system.overview}</p>
                  <p className="text-muted-foreground text-sm italic">{data.permissions.overview}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle>Categories & Perms</CardTitle>
                <CardDescription>Logical groupings and access overrides.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {data.categories.map((cat, idx) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4 py-1">
                        <h4 className="font-bold text-accent uppercase tracking-wider text-sm flex items-center justify-between">
                          {cat.name}
                          <Badge variant="outline" className="text-[10px]">Category</Badge>
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">{cat.description}</p>
                        <div className="space-y-1">
                          {cat.text_channels.map(ch => (
                            <div key={ch} className="flex items-center gap-2 text-sm text-foreground/80">
                              <Hash className="w-3 h-3 text-muted-foreground" /> {ch}
                            </div>
                          ))}
                          {cat.voice_channels.map(ch => (
                            <div key={ch} className="flex items-center gap-2 text-sm text-foreground/80">
                              <Volume2 className="w-3 h-3 text-muted-foreground" /> {ch}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle>Detailed Channel Blueprint</CardTitle>
                <CardDescription>Topics and specialized overrides.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {data.channels.map((chan, idx) => (
                      <div key={idx} className="bg-secondary/20 p-3 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold flex items-center gap-2">
                            <Hash className="w-4 h-4 text-accent" /> {chan.name}
                          </span>
                          <Badge variant="secondary" className="text-[10px] capitalize">{chan.type}</Badge>
                        </div>
                        {chan.topic && <p className="text-xs text-muted-foreground mb-2 italic">"{chan.topic}"</p>}
                        <div className="flex flex-wrap gap-1 mt-2">
                           {Object.entries(chan.permissions).map(([role, perms]) => (
                             <Badge key={role} variant="outline" className="text-[9px] border-primary/20">
                               {role}: {perms.length} perms
                             </Badge>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="bg-card/40 border-border">
            <CardHeader>
              <CardTitle>Role Hierarchy</CardTitle>
              <CardDescription>Managed permissions and visual branding.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.roles.sort((a,b) => b.hierarchy_level - a.hierarchy_level).map((role, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-secondary/20 rounded-2xl border border-border group hover:border-primary/40 transition-colors">
                    <div className="w-2 h-12 rounded-full" style={{ backgroundColor: role.hex_color }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg" style={{ color: role.hex_color }}>{role.name}</h4>
                        <Badge variant="outline" className="text-[10px]">Rank {role.hierarchy_level}</Badge>
                      </div>
                      {role.description && <p className="text-xs text-muted-foreground mt-1">{role.description}</p>}
                    </div>
                    <div className="hidden md:flex flex-wrap gap-1 max-w-[300px] justify-end">
                      {role.permissions.slice(0, 3).map(p => (
                        <Badge key={p} variant="secondary" className="text-[9px]">{p}</Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-[9px]">+{role.permissions.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bots">
          <div className="grid md:grid-cols-2 gap-6">
            {data.recommended_bots.map((bot, idx) => (
              <Card key={idx} className="bg-card/40 border-primary/20 hover:border-accent/40 transition-all group">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-2xl group-hover:bg-accent/20 transition-colors">
                    <Bot className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-accent transition-colors">{bot.name}</CardTitle>
                    <CardDescription>{bot.purpose}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/40 p-4 rounded-xl text-sm leading-relaxed border border-border/50">
                    <h5 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                      <Settings className="w-3 h-3" /> Config Suggestions
                    </h5>
                    {bot.config_suggestions}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" /> Moderation Core
                </CardTitle>
                <CardDescription>Policy and enforcement strategies.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Action Guidelines</label>
                  <p className="text-sm text-foreground/80 bg-secondary/20 p-3 rounded-lg border border-border">{data.security_system.moderation_actions}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Anti-Raid Measures</label>
                  <p className="text-sm text-foreground/80 bg-secondary/20 p-3 rounded-lg border border-border">{data.security_system.anti_raid_measures || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-accent" /> Welcome System
                </CardTitle>
                <CardDescription>Onboarding and member retention.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Process Overview</label>
                  <p className="text-sm text-foreground/80 bg-secondary/20 p-3 rounded-lg border border-border">{data.welcome_system.overview}</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/40 rounded-lg">
                  <span className="text-sm">Welcome Channel:</span>
                  <Badge className="bg-primary">{data.welcome_system.welcome_channel_name || "#welcome"}</Badge>
                </div>
                {data.welcome_system.auto_role_assignment && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Auto-Roles</label>
                    <div className="flex gap-2">
                      {data.welcome_system.auto_role_assignment.map(role => (
                        <Badge key={role} variant="outline" className="border-accent/40 text-accent">{role}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
