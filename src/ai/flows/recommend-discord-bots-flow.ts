'use server';
/**
 * @fileOverview Local generator for Discord bot recommendations.
 * Bypasses external APIs to ensure consistent results.
 */

import { z } from 'genkit';

const RecommendDiscordBotsInputSchema = z.object({
  serverType: z.string().optional(),
  features: z.array(z.string()).optional(),
});
export type RecommendDiscordBotsInput = z.infer<typeof RecommendDiscordBotsInputSchema>;

const RecommendedBotSchema = z.object({
  name: z.string(),
  description: z.string(),
  configuration_suggestions: z.string(),
});

const RecommendDiscordBotsOutputSchema = z.object({
  recommended_bots: z.array(RecommendedBotSchema),
});
export type RecommendDiscordBotsOutput = z.infer<typeof RecommendDiscordBotsOutputSchema>;

export async function recommendDiscordBots(input: RecommendDiscordBotsInput): Promise<RecommendDiscordBotsOutput> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const bots = [
    {
      name: "Dyno",
      description: "A fully customizable server moderation discord bot.",
      configuration_suggestions: "Setup the Auto-mod to protect against spam and use the Custom Commands for common server info."
    },
    {
      name: "MEE6",
      description: "The most complete Discord bot for moderation, leveling, and more.",
      configuration_suggestions: "Configure the leveling system to reward active members with custom roles."
    },
    {
      name: "Ticket Tool",
      description: "A powerful ticket system for support and applications.",
      configuration_suggestions: "Use for staff applications and private support queries."
    }
  ];

  return { recommended_bots: bots };
}
