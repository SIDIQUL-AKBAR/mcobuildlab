'use server';
/**
 * @fileOverview A Genkit flow for recommending Discord bots and their configuration suggestions
 * based on server type and desired features.
 *
 * - recommendDiscordBots - A function that handles the bot recommendation process.
 * - RecommendDiscordBotsInput - The input type for the recommendDiscordBots function.
 * - RecommendDiscordBotsOutput - The return type for the recommendDiscordBots function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendDiscordBotsInputSchema = z.object({
  serverType: z.string().describe('The main type or theme of the Discord server.').optional(),
  features: z.array(z.string()).describe('A list of desired features for the Discord server.').optional(),
});
export type RecommendDiscordBotsInput = z.infer<typeof RecommendDiscordBotsInputSchema>;

const RecommendedBotSchema = z.object({
  name: z.string().describe('The name of the recommended Discord bot.'),
  description: z.string().describe('A brief description of what the bot does and why it is recommended.'),
  configuration_suggestions: z.string().describe('Detailed suggestions for configuring the bot to fit the server needs.'),
});

const RecommendDiscordBotsOutputSchema = z.object({
  recommended_bots: z.array(RecommendedBotSchema).describe('A list of recommended Discord bots with configuration suggestions.'),
});
export type RecommendDiscordBotsOutput = z.infer<typeof RecommendDiscordBotsOutputSchema>;

export async function recommendDiscordBots(input: RecommendDiscordBotsInput): Promise<RecommendDiscordBotsOutput> {
  return recommendDiscordBotsFlow(input);
}

const recommendDiscordBotsPrompt = ai.definePrompt({
  name: 'recommendDiscordBotsPrompt',
  input: {schema: RecommendDiscordBotsInputSchema},
  output: {schema: RecommendDiscordBotsOutputSchema},
  prompt: `You are an expert Discord Server Architect. Your task is to recommend the best Discord bots and provide configuration suggestions tailored to the user's server type and desired features.

Server Type: {{{serverType}}}
Desired Features: {{{features}}}

Based on the information above, generate a list of Discord bots that would be essential or highly beneficial for this server, along with detailed configuration suggestions for each. Focus on professional, scalable, and production-ready solutions. Ensure the recommendations cover the desired features and align with the server type.

Structure your response as a JSON object, specifically with a 'recommended_bots' array, where each element is an object containing 'name', 'description', and 'configuration_suggestions' for each bot.`,
});

const recommendDiscordBotsFlow = ai.defineFlow(
  {
    name: 'recommendDiscordBotsFlow',
    inputSchema: RecommendDiscordBotsInputSchema,
    outputSchema: RecommendDiscordBotsOutputSchema,
  },
  async (input) => {
    const {output} = await recommendDiscordBotsPrompt(input);
    return output!;
  }
);
