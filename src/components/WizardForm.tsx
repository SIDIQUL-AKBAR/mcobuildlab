"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generateDiscordServerStructure, GenerateDiscordServerStructureInput, GenerateDiscordServerStructureOutput } from '@/ai/flows/generate-discord-server-structure-flow';
import ServerResult from '@/components/ServerResult';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  'SERVER NAME',
  'CREATE MODE',
  'SERVER TYPE',
  'SERVER SIZE',
  'SERVER STYLE',
  'FEATURES',
  'SYSTEM SCALING',
  'SECURITY LEVEL',
  'COMMUNITY FEATURES',
  'STAFF SYSTEM',
  'MONETIZATION',
  'LANGUAGE',
];

const CREATE_MODES = ['🆕 New Server', '🔄 Overwrite Existing Server', '📥 Import & Upgrade Existing Server'];
const SERVER_TYPES = ['Gaming', 'Community', 'Content Creator', 'YouTuber', 'Music', 'Art', 'Study', 'Business', 'Technology', 'AI', 'Roleplay', 'Anime', 'Roblox', 'Minecraft', 'Esports', 'Multi-Purpose', 'Other'];
const SERVER_SIZES = ['Under 100 Members', '100-500 Members', '500-1000 Members', '1000-5000 Members', '5000+ Members'];
const SERVER_STYLES = ['Modern', 'Gaming', 'Professional', 'Cyber', 'Premium', 'Aesthetic', 'Neon', 'Anime', 'Medieval', 'Futuristic'];
const FEATURES = ['Verification', 'Tickets', 'Giveaways', 'Suggestions', 'Applications', 'Auto Roles', 'Leveling', 'Economy', 'Partnerships', 'Music', 'Events', 'Polls', 'Server Stats', 'Temporary Voice Channels', 'Shop System', 'Custom Commands'];
const LEVEL_ROLES_OPTIONS = ['10', '25', '50', '100'];
const DENSITIES = ['Compact', 'Standard', 'Large Community', 'Massive Community'];
const COMPLEXITIES = ['⚡ Starter', '🚀 Advanced', '🏆 Professional', '👑 Enterprise'];
const SECURITY_LEVELS = ['Basic', 'Standard', 'Advanced', 'Maximum'];
const COMMUNITY_FEATURES = ['General Chat', 'Events', 'Media Sharing', 'Creations', 'LFG System', 'Competitions', 'Announcements', 'Partnerships', 'Polls', 'Music Sharing'];
const STAFF_SYSTEMS = ['Owner Only', 'Small Staff Team', 'Medium Staff Team', 'Large Staff Team'];
const MONETIZATION_OPTIONS = ['No', 'Donations', 'Products', 'Premium Memberships'];
const LANGUAGES = ['English', 'English + Hindi', 'English + Malayalam', 'Multi-Language'];

export default function WizardForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateDiscordServerStructureOutput | null>(null);

  const [formData, setFormData] = useState<Partial<GenerateDiscordServerStructureInput>>({
    serverName: '',
    createMode: '🆕 New Server',
    serverType: 'Community',
    otherServerType: '',
    serverSize: 'Under 100 Members',
    serverStyle: 'Modern',
    features: [],
    levelRolesCount: '10',
    generateColorRoles: false,
    generateFunRoles: false,
    generateAchievementRoles: false,
    roleSystemSize: 'Medium',
    voiceSystemSize: 'Standard',
    categoryDensity: 'Standard',
    serverComplexity: '🚀 Advanced',
    securityLevel: 'Standard',
    communityFeatures: [],
    staffSystem: 'Small Staff Team',
    monetization: 'No',
    language: 'English',
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const updateField = (field: keyof GenerateDiscordServerStructureInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'features' | 'communityFeatures', value: string) => {
    setFormData((prev) => {
      const current = (prev[field] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleSubmit = async () => {
    if (!formData.serverName) {
      toast({ variant: 'destructive', title: 'Invalid Input', description: 'Server name is mandatory.' });
      return;
    }
    setLoading(true);
    try {
      const output = await generateDiscordServerStructure(formData as GenerateDiscordServerStructureInput);
      setResult(output);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Architectural Error', description: error.message || 'Failed to generate infrastructure.' });
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return <ServerResult data={result} onReset={() => setResult(null)} />;
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-border bg-card/80 backdrop-blur-md shadow-2xl overflow-hidden border-accent/20">
        <CardHeader className="border-b border-accent/10 py-4 bg-background/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              Phase {step + 1}: {STEPS[step]}
            </span>
            <span className="text-xs font-medium text-muted-foreground">{step + 1} of {STEPS.length}</span>
          </div>
          <Progress value={progress} className="h-1 bg-accent/10" />
        </CardHeader>

        <CardContent className="p-8">
          <div className="min-h-[450px]">
            {step === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Node Identification</h2>
                  <p className="text-muted-foreground">Define the primary identification for your MCO Build Lab project.</p>
                </div>
                <Input
                  placeholder="Enter Server Name"
                  className="text-2xl h-16 px-6 bg-background/40 border-accent/20 focus:border-accent transition-all"
                  value={formData.serverName}
                  onChange={(e) => updateField('serverName', e.target.value)}
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/5 p-4 rounded-lg border border-accent/10">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  Note: This name will be the root identifier for all generated roles and metadata.
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Deployment Mode</h2>
                  <p className="text-muted-foreground">How should the infrastructure be initialized?</p>
                </div>
                <div className="grid gap-4">
                  {CREATE_MODES.map((mode) => (
                    <Button
                      key={mode}
                      variant={formData.createMode === mode ? 'default' : 'outline'}
                      className={`h-20 text-xl justify-start px-8 ${formData.createMode === mode ? 'bg-accent text-accent-foreground ring-2 ring-accent/50' : ''}`}
                      onClick={() => updateField('createMode', mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Infrastructural Focus</h2>
                  <p className="text-muted-foreground">Select the primary functional vertical.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVER_TYPES.map((type) => (
                    <Button
                      key={type}
                      variant={formData.serverType === type ? 'default' : 'outline'}
                      className={`h-12 text-sm ${formData.serverType === type ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('serverType', type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
                {formData.serverType === 'Other' && (
                  <Input
                    placeholder="Specify other server type..."
                    className="mt-4"
                    value={formData.otherServerType}
                    onChange={(e) => updateField('otherServerType', e.target.value)}
                  />
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Network Capacity</h2>
                  <p className="text-muted-foreground">Estimated concurrent node connections.</p>
                </div>
                <div className="grid gap-3">
                  {SERVER_SIZES.map((size) => (
                    <Button
                      key={size}
                      variant={formData.serverSize === size ? 'default' : 'outline'}
                      className={`h-14 text-lg ${formData.serverSize === size ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('serverSize', size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Visual Interface</h2>
                  <p className="text-muted-foreground">Define the aesthetic protocol for all UI elements.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SERVER_STYLES.map((style) => (
                    <Button
                      key={style}
                      variant={formData.serverStyle === style ? 'default' : 'outline'}
                      className={`h-14 ${formData.serverStyle === style ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('serverStyle', style)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Functional Extensions</h2>
                  <p className="text-muted-foreground">Inject specific capabilities into the blueprint.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 bg-accent/5 p-4 rounded-xl hover:bg-accent/10 transition-all cursor-pointer border border-transparent hover:border-accent/20" onClick={() => toggleArrayField('features', feature)}>
                      <Checkbox id={feature} checked={formData.features?.includes(feature)} />
                      <Label htmlFor={feature} className="text-base cursor-pointer">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">System Scaling</h2>
                  <p className="text-muted-foreground">Fine-tune internal role and channel distribution.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <Label className="text-accent uppercase tracking-tighter text-xs">Category Density</Label>
                     <RadioGroup value={formData.categoryDensity} onValueChange={(v) => updateField('categoryDensity', v)} className="grid grid-cols-2 gap-2">
                        {DENSITIES.map(d => (
                          <div key={d} className="flex items-center space-x-2 bg-background/40 p-3 rounded-lg border border-border">
                            <RadioGroupItem value={d} id={`density-${d}`} />
                            <Label htmlFor={`density-${d}`} className="text-xs">{d}</Label>
                          </div>
                        ))}
                     </RadioGroup>
                  </div>
                  <div className="space-y-4">
                     <Label className="text-accent uppercase tracking-tighter text-xs">Architectural Complexity</Label>
                     <RadioGroup value={formData.serverComplexity} onValueChange={(v) => updateField('serverComplexity', v)} className="grid grid-cols-2 gap-2">
                        {COMPLEXITIES.map(c => (
                          <div key={c} className="flex items-center space-x-2 bg-background/40 p-3 rounded-lg border border-border">
                            <RadioGroupItem value={c} id={`complex-${c}`} />
                            <Label htmlFor={`complex-${c}`} className="text-xs">{c}</Label>
                          </div>
                        ))}
                     </RadioGroup>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                   <div className="flex flex-col gap-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Color Roles</Label>
                      <Button variant={formData.generateColorRoles ? 'default' : 'outline'} size="sm" onClick={() => updateField('generateColorRoles', !formData.generateColorRoles)}>
                        {formData.generateColorRoles ? 'ACTIVE' : 'INACTIVE'}
                      </Button>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Fun Roles</Label>
                      <Button variant={formData.generateFunRoles ? 'default' : 'outline'} size="sm" onClick={() => updateField('generateFunRoles', !formData.generateFunRoles)}>
                        {formData.generateFunRoles ? 'ACTIVE' : 'INACTIVE'}
                      </Button>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Achievement Roles</Label>
                      <Button variant={formData.generateAchievementRoles ? 'default' : 'outline'} size="sm" onClick={() => updateField('generateAchievementRoles', !formData.generateAchievementRoles)}>
                        {formData.generateAchievementRoles ? 'ACTIVE' : 'INACTIVE'}
                      </Button>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Label className="text-[10px] uppercase text-muted-foreground">Level Roles</Label>
                      <select 
                        className="bg-background border border-border rounded p-1 text-xs h-9"
                        value={formData.levelRolesCount}
                        onChange={(e) => updateField('levelRolesCount', e.target.value)}
                      >
                        {LEVEL_ROLES_OPTIONS.map(o => <option key={o} value={o}>{o} Roles</option>)}
                      </select>
                   </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Security Protocols</h2>
                  <p className="text-muted-foreground">Define the standard baseline for anti-threat detection.</p>
                </div>
                <div className="grid gap-4">
                  {SECURITY_LEVELS.map((level) => (
                    <Button
                      key={level}
                      variant={formData.securityLevel === level ? 'default' : 'outline'}
                      className={`h-16 text-xl ${formData.securityLevel === level ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('securityLevel', level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Engagement Framework</h2>
                  <p className="text-muted-foreground">How will nodes facilitate interaction?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2">
                  {COMMUNITY_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 bg-accent/5 p-4 rounded-xl hover:bg-accent/10 transition-all cursor-pointer border border-transparent hover:border-accent/20" onClick={() => toggleArrayField('communityFeatures', feature)}>
                      <Checkbox id={feature} checked={formData.communityFeatures?.includes(feature)} />
                      <Label htmlFor={feature} className="text-base cursor-pointer">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Management Hierarchy</h2>
                  <p className="text-muted-foreground">Define the administrative scope.</p>
                </div>
                <div className="grid gap-4">
                  {STAFF_SYSTEMS.map((sys) => (
                    <Button
                      key={sys}
                      variant={formData.staffSystem === sys ? 'default' : 'outline'}
                      className={`h-16 text-lg ${formData.staffSystem === sys ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('staffSystem', sys)}
                    >
                      {sys}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Revenue Architecture</h2>
                  <p className="text-muted-foreground">Will the infrastructure include commercial pathways?</p>
                </div>
                <div className="grid gap-4">
                  {MONETIZATION_OPTIONS.map((opt) => (
                    <Button
                      key={opt}
                      variant={formData.monetization === opt ? 'default' : 'outline'}
                      className={`h-16 text-lg ${formData.monetization === opt ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('monetization', opt)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 font-headline uppercase">Localization Layer</h2>
                  <p className="text-muted-foreground">Specify the primary communication protocol.</p>
                </div>
                <div className="grid gap-4">
                  {LANGUAGES.map((lang) => (
                    <Button
                      key={lang}
                      variant={formData.language === lang ? 'default' : 'outline'}
                      className={`h-16 text-lg ${formData.language === lang ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => updateField('language', lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-accent/10">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 0 || loading}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {step === STEPS.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={loading || !formData.serverName}
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-accent/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Compiling Blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Finalize Structure
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={next}
                disabled={step === 0 && !formData.serverName}
                className="px-8 py-6 bg-primary hover:bg-primary/90 rounded-xl flex items-center gap-2"
              >
                Next Phase <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
