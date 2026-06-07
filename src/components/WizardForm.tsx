"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { generateDiscordServerStructure, GenerateDiscordServerStructureInput, GenerateDiscordServerStructureOutput } from '@/ai/flows/generate-discord-server-structure-flow';
import ServerResult from '@/components/ServerResult';

const STEPS = [
  'SERVER NAME',
  'SERVER TYPE',
  'SERVER SIZE',
  'SERVER STYLE',
  'FEATURES',
  'SECURITY LEVEL',
  'COMMUNITY FEATURES',
  'STAFF SYSTEM',
  'MONETIZATION',
  'LANGUAGE',
];

const SERVER_TYPES = ['Gaming', 'Community', 'Content Creator', 'YouTuber', 'Music', 'Art', 'Study', 'Business', 'Technology', 'AI', 'Roleplay', 'Anime', 'Roblox', 'Minecraft', 'Esports', 'Multi-Purpose', 'Other'];
const SERVER_SIZES = ['Under 100 Members', '100-500 Members', '500-1000 Members', '1000-5000 Members', '5000+ Members'];
const SERVER_STYLES = ['Modern', 'Gaming', 'Professional', 'Cyber', 'Premium', 'Aesthetic', 'Neon', 'Anime', 'Medieval', 'Futuristic'];
const FEATURES = ['Verification', 'Tickets', 'Giveaways', 'Suggestions', 'Applications', 'Auto Roles', 'Leveling', 'Economy', 'Partnerships', 'Music', 'Events', 'Polls', 'Server Stats', 'Temporary Voice Channels', 'Shop System', 'Custom Commands'];
const SECURITY_LEVELS = ['Basic', 'Standard', 'Advanced', 'Maximum'];
const COMMUNITY_FEATURES = ['General Chat', 'Events', 'Media Sharing', 'Creations', 'LFG System', 'Competitions', 'Announcements', 'Partnerships', 'Polls', 'Music Sharing'];
const STAFF_SYSTEMS = ['Owner Only', 'Small Staff Team', 'Medium Staff Team', 'Large Staff Team'];
const MONETIZATION_OPTIONS = ['No', 'Donations', 'Products', 'Premium Memberships'];
const LANGUAGES = ['English', 'English + Hindi', 'English + Malayalam', 'Multi-Language'];

export default function WizardForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateDiscordServerStructureOutput | null>(null);

  const [formData, setFormData] = useState<Partial<GenerateDiscordServerStructureInput>>({
    serverName: '',
    serverType: 'Community',
    otherServerType: '',
    serverSize: 'Under 100 Members',
    serverStyle: 'Modern',
    features: [],
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
    setLoading(true);
    try {
      const output = await generateDiscordServerStructure(formData as GenerateDiscordServerStructureInput);
      setResult(output);
    } catch (error) {
      console.error(error);
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
      <Card className="border-border bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-border py-4 bg-background/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              Phase {step + 1}: {STEPS[step]}
            </span>
            <span className="text-xs font-medium text-muted-foreground">{step + 1} of {STEPS.length}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </CardHeader>

        <CardContent className="p-8">
          <div className="min-h-[400px]">
            {step === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Build Your Identity</h2>
                  <p className="text-muted-foreground">Give your Discord server a professional name.</p>
                </div>
                <Input
                  placeholder="Enter Server Name"
                  className="text-2xl h-16 px-6 bg-background/40"
                  value={formData.serverName}
                  onChange={(e) => updateField('serverName', e.target.value)}
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Select Server Focus</h2>
                  <p className="text-muted-foreground">What is the primary purpose of this server?</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVER_TYPES.map((type) => (
                    <Button
                      key={type}
                      variant={formData.serverType === type ? 'default' : 'outline'}
                      className={`h-12 text-sm justify-start px-4 ${formData.serverType === type ? 'bg-primary ring-2 ring-accent' : ''}`}
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

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Community Scale</h2>
                  <p className="text-muted-foreground">Estimate your expected member count.</p>
                </div>
                <div className="grid gap-3">
                  {SERVER_SIZES.map((size) => (
                    <Button
                      key={size}
                      variant={formData.serverSize === size ? 'default' : 'outline'}
                      className="h-14 text-lg"
                      onClick={() => updateField('serverSize', size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Aesthetic Direction</h2>
                  <p className="text-muted-foreground">Choose the visual style for your channels and roles.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SERVER_STYLES.map((style) => (
                    <Button
                      key={style}
                      variant={formData.serverStyle === style ? 'default' : 'outline'}
                      className="h-14"
                      onClick={() => updateField('serverStyle', style)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Core Features</h2>
                  <p className="text-muted-foreground">Select the functionalities your server needs.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => toggleArrayField('features', feature)}>
                      <Checkbox id={feature} checked={formData.features?.includes(feature as any)} onCheckedChange={() => toggleArrayField('features', feature)} />
                      <Label htmlFor={feature} className="text-base cursor-pointer">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Security Architecture</h2>
                  <p className="text-muted-foreground">Set the baseline moderation strength.</p>
                </div>
                <div className="grid gap-4">
                  {SECURITY_LEVELS.map((level) => (
                    <Button
                      key={level}
                      variant={formData.securityLevel === level ? 'default' : 'outline'}
                      className="h-16 text-xl"
                      onClick={() => updateField('securityLevel', level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Engagement Features</h2>
                  <p className="text-muted-foreground">How will your community interact?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMUNITY_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 bg-secondary/30 p-4 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => toggleArrayField('communityFeatures', feature)}>
                      <Checkbox id={feature} checked={formData.communityFeatures?.includes(feature as any)} onCheckedChange={() => toggleArrayField('communityFeatures', feature)} />
                      <Label htmlFor={feature} className="text-base cursor-pointer">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Staffing Model</h2>
                  <p className="text-muted-foreground">Define your management hierarchy.</p>
                </div>
                <div className="grid gap-4">
                  {STAFF_SYSTEMS.map((sys) => (
                    <Button
                      key={sys}
                      variant={formData.staffSystem === sys ? 'default' : 'outline'}
                      className="h-16 text-lg"
                      onClick={() => updateField('staffSystem', sys)}
                    >
                      {sys}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Monetization Plan</h2>
                  <p className="text-muted-foreground">Will your server have paid elements?</p>
                </div>
                <div className="grid gap-4">
                  {MONETIZATION_OPTIONS.map((opt) => (
                    <Button
                      key={opt}
                      variant={formData.monetization === opt ? 'default' : 'outline'}
                      className="h-16 text-lg"
                      onClick={() => updateField('monetization', opt)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Localization</h2>
                  <p className="text-muted-foreground">What language(s) will be used?</p>
                </div>
                <div className="grid gap-4">
                  {LANGUAGES.map((lang) => (
                    <Button
                      key={lang}
                      variant={formData.language === lang ? 'default' : 'outline'}
                      className="h-16 text-lg"
                      onClick={() => updateField('language', lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
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
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 rounded-xl font-bold text-lg flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Finalize Architecture
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={next}
                disabled={step === 0 && !formData.serverName}
                className="px-8 py-6 bg-primary hover:bg-primary/90 rounded-xl flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {loading && (
        <div className="mt-8 text-center animate-pulse">
          <p className="text-accent text-sm font-bold uppercase tracking-widest">Constructing channel structure & role hierarchy...</p>
        </div>
      )}
    </div>
  );
}
