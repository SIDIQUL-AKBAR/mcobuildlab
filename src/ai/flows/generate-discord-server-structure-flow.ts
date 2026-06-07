'use server';
/**
 * @fileOverview A Genkit flow for generating a complete Discord server structure based on user-defined preferences.
 *
 * - generateDiscordServerStructure - The main function to call the Genkit flow.
 * - GenerateDiscordServerStructureInput - The input type for the flow.
 * - GenerateDiscordServerStructureOutput - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateDiscordServerStructureInputSchema = z.object({
  serverName: z.string().describe('The name of the Discord server.'),
  serverType: z.enum(['Gaming', 'Community', 'Content Creator', 'YouTuber', 'Music', 'Art', 'Study', 'Business', 'Technology', 'AI', 'Roleplay', 'Anime', 'Roblox', 'Minecraft', 'Esports', 'Multi-Purpose', 'Other']).describe('The primary type or focus of the Discord server.'),
  otherServerType: z.string().optional().describe('Description for server type if \'Other\' is selected.'),
  serverSize: z.enum(['Under 100 Members', '100-500 Members', '500-1000 Members', '1000-5000 Members', '5000+ Members']).describe('The approximate expected size of the server community.'),
  serverStyle: z.enum(['Modern', 'Gaming', 'Professional', 'Cyber', 'Premium', 'Aesthetic', 'Neon', 'Anime', 'Medieval', 'Futuristic']).describe('The aesthetic style of the Discord server.'),
  features: z.array(z.enum(['Verification', 'Tickets', 'Giveaways', 'Suggestions', 'Applications', 'Auto Roles', 'Leveling', 'Economy', 'Partnerships', 'Music', 'Events', 'Polls', 'Server Stats', 'Temporary Voice Channels', 'Shop System', 'Custom Commands'])).describe('A list of desired features for the server.'),
  securityLevel: z.enum(['Basic', 'Standard', 'Advanced', 'Maximum']).describe('The desired level of security and moderation for the server.'),
  communityFeatures: z.array(z.enum(['General Chat', 'Events', 'Media Sharing', 'Creations', 'LFG System', 'Competitions', 'Announcements', 'Partnerships', 'Polls', 'Music Sharing'])).describe('A list of community engagement features.'),
  staffSystem: z.enum(['Owner Only', 'Small Staff Team', 'Medium Staff Team', 'Large Staff Team']).describe('The expected size and structure of the staff team.'),
  monetization: z.enum(['No', 'Donations', 'Products', 'Premium Memberships']).describe('The monetization strategy, if any.'),
  language: z.enum(['English', 'English + Hindi', 'English + Malayalam', 'Multi-Language']).describe('The primary language(s) used in the server.'),
});

export type GenerateDiscordServerStructureInput = z.infer<typeof GenerateDiscordServerStructureInputSchema>;

const GenerateDiscordServerStructureOutputSchema = z.object({
  server_info: z.object({
    name: z.string().describe('The name of the server.'),
    type: z.string().describe('The primary type/focus of the server.'),
    size: z.string().describe('The estimated member count.'),
    style: z.string().describe('The aesthetic style.'),
    language: z.string().describe('The primary language(s).'),
    description: z.string().describe('A detailed analysis and overview of the server based on the inputs.'),
  }).describe('General information and analysis of the Discord server.'),
  roles: z.array(z.object({
    name: z.string().describe('The name of the role (e.g., Member, Admin, Moderator).'),
    hex_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).describe('The HEX color code for the role.'),
    permissions: z.array(z.string()).describe('A list of Discord permission flags (e.g., KICK_MEMBERS, MANAGE_CHANNELS, VIEW_CHANNEL).'),
    hierarchy_level: z.number().describe('The position of the role in the hierarchy (higher numbers are higher in rank).'),
    description: z.string().optional().describe('A brief description of the role and its responsibilities.'),
  })).describe('A full hierarchy of roles with their colors, permissions, and descriptions.'),
  categories: z.array(z.object({
    name: z.string().describe('The name of the channel category (e.g., General, Information, Moderation).'),
    description: z.string().optional().describe('A brief description of the category purpose.'),
    text_channels: z.array(z.string()).describe('An array of text channel names within this category.'),
    voice_channels: z.array(z.string()).describe('An array of voice channel names within this category.'),
    permissions: z.record(z.string(), z.array(z.string())).describe('Permissions overrides for roles within this category (role_name -> [permission_flags]).'),
  })).describe('The complete category structure of the server.'),
  channels: z.array(z.object({
    name: z.string().describe('The name of the text channel (e.g., general, rules, announcements).'),
    type: z.enum(['text', 'announcement', 'forum', 'rules', 'welcome', 'logs', 'bot-commands']).describe('The type of the text channel.'),
    parent_category: z.string().describe('The name of the category this channel belongs to.'),
    topic: z.string().optional().describe('A short topic or description for the channel.'),
    permissions: z.record(z.string(), z.array(z.string())).describe('Permissions overrides for roles within this channel (role_name -> [permission_flags]).'),
  })).describe('The complete text and announcement channel structure.'),
  voice_channels: z.array(z.object({
    name: z.string().describe('The name of the voice channel (e.g., General Voice, AFK).'),
    parent_category: z.string().describe('The name of the category this voice channel belongs to.'),
    topic: z.string().optional().describe('A short topic or description for the voice channel.'),
    permissions: z.record(z.string(), z.array(z.string())).describe('Permissions overrides for roles within this voice channel (role_name -> [permission_flags]).'),
  })).describe('The complete voice channel structure.'),
  permissions: z.object({
    overview: z.string().describe('A detailed overview of the overall permission strategy and philosophy for the server.'),
  }).describe('A high-level explanation of the server-wide permission strategy.'),
  recommended_bots: z.array(z.object({
    name: z.string().describe('The name of the recommended bot.'),
    purpose: z.string().describe('The main purpose or functionality of the bot.'),
    config_suggestions: z.string().describe('Specific configuration suggestions for the bot to integrate with the server structure.'),
  })).describe('A list of recommended bots with their purposes and configuration suggestions.'),
  server_settings: z.object({
    verification_level: z.string().describe('Discord server verification level (None, Low, Medium, High, Very High).'),
    explicit_content_filter: z.string().describe('Discord server explicit content filter level (Off, No scan, Scan messages from all members).'),
    afk_timeout: z.string().describe('AFK channel timeout (e.g., 5 minutes, 15 minutes, 1 hour).'),
    system_messages_channel: z.string().optional().describe('The designated channel for system messages (e.g., #general).'),
    rules_channel: z.string().optional().describe('The designated channel for server rules (e.g., #rules).'),
    onboarding_setup: z.string().optional().describe('Suggestions for Discord onboarding setup, including welcome screen and member questions.'),
  }).describe('General Discord server settings.'),
  welcome_system: z.object({
    overview: z.string().describe('Description of the welcome process for new members.'),
    welcome_channel_name: z.string().optional().describe('The name of the welcome channel (e.g., #welcome).'),
    auto_role_assignment: z.array(z.string()).optional().describe('Roles automatically assigned to new members.'),
  }).describe('Details about the server\'s welcome and onboarding system.'),
  security_system: z.object({
    overview: z.string().describe('Description of the security and moderation strategies.'),
    moderation_actions: z.string().describe('Common moderation actions and guidelines.'),
    anti_raid_measures: z.string().optional().describe('Strategies to prevent and mitigate raids.'),
    bot_security: z.string().optional().describe('Measures for securing bot integrations.'),
  }).describe('Details about the server\'s security and moderation system.'),
  growth_features: z.object({
    overview: z.string().describe('Description of features and strategies to promote server growth and engagement.'),
    community_engagement_strategies: z.string().describe('Ideas for fostering an active and engaged community.'),
    event_ideas: z.string().optional().describe('Suggestions for community events.'),
    partnership_guidelines: z.string().optional().describe('Guidelines or ideas for server partnerships.'),
  }).describe('Features and strategies designed for server growth and member retention.'),
});

export type GenerateDiscordServerStructureOutput = z.infer<typeof GenerateDiscordServerStructureOutputSchema>;

const discordServerArchitectPrompt = ai.definePrompt({
  name: 'discordServerArchitectPrompt',
  input: { schema: GenerateDiscordServerStructureInputSchema },
  output: { schema: GenerateDiscordServerStructureOutputSchema },
  // Explicitly setting the model ID to ensure it routes correctly to the Google AI plugin
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are MCO Build AI, a professional Discord Server Architect. Your task is to generate a complete, professional, scalable, and production-ready Discord server structure based on the user's preferences.

Generate a single, valid JSON object containing the complete server blueprint. Ensure all fields in the output schema are thoroughly and thoughtfully populated, providing specific details and practical suggestions.

User Preferences:
Server Name: {{{serverName}}}
Server Type: {{{serverType}}}{{#if otherServerType}} (Details: {{{otherServerType}}}){{/if}}
Server Size: {{{serverSize}}}
Server Style: {{{serverStyle}}}
Features: {{#each features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Security Level: {{{securityLevel}}}
Community Features: {{#each communityFeatures}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Staff System: {{{staffSystem}}}
Monetization: {{{monetization}}}
Language: {{{language}}}

Instructions for JSON Output:

1.  **server_info**: Provide an overall analysis and description, and reiterate the key server characteristics.
2.  **roles**: Define a comprehensive hierarchy of roles. Include common roles like 'Member', 'Moderator', 'Admin', and any specific roles relevant to the server type and features (e.g., 'Gamer', 'Artist'). Assign a unique, professional HEX color for each role. Define appropriate Discord permission flags for each role (e.g., VIEW_CHANNEL, SEND_MESSAGES, KICK_MEMBERS, MANAGE_CHANNELS). Ensure hierarchy_level reflects the role's importance (higher number = higher rank).
3.  **categories**: Create logical categories to organize channels (e.g., 'Welcome', 'General', 'Voice', 'Moderation', 'Community', 'Gaming'). List the specific text and voice channels that belong to each category. Include permissions overrides for key roles within each category (e.g., only staff roles can see Moderation categories).
4.  **channels**: Define all necessary text channels within their respective categories. Include standard channels like '#rules', '#announcements', '#general', '#bot-commands', and specific channels based on server type and features (e.g., '#lfg', '#art-showcase', '#music-discussion', '#suggestions', '#tickets'). Provide a concise topic for each channel. Include permissions overrides for key roles within each channel.
5.  **voice_channels**: Define all necessary voice channels within their respective categories (e.g., 'General Chat', 'Gaming VC', 'AFK'). Include permissions overrides for key roles within each voice channel.
6.  **permissions**: Provide a detailed narrative overview of the server's permission strategy, explaining the logic behind role and channel permissions to maintain order and security.
7.  **recommended_bots**: Automatically select the best bots based on the server type, size, features, and security level. For each bot, explain its purpose and provide specific configuration suggestions that integrate it seamlessly into the server structure.
8.  **server_settings**: Suggest appropriate Discord server settings including verification level, explicit content filter, AFK timeout, and designated channels for system messages and rules. Include a detailed plan for Discord's built-in Onboarding setup.
9.  **welcome_system**: Describe the automated welcome process, including welcome messages, rules acceptance, and any initial role assignments. Specify the welcome channel name.
10. **security_system**: Detail the security and moderation strategies, including anti-raid measures, moderation bot configurations, and staff guidelines for handling incidents. Emphasize measures aligned with the selected security level.
11. **growth_features**: Outline strategies and features to promote community engagement, foster growth, and retain members. Include ideas for events, partnerships, and unique community activities based on server type.

The generated JSON must be valid and conform strictly to the provided output schema.
`,
});

const generateDiscordServerStructureFlow = ai.defineFlow(
  {
    name: 'generateDiscordServerStructureFlow',
    inputSchema: GenerateDiscordServerStructureInputSchema,
    outputSchema: GenerateDiscordServerStructureOutputSchema,
  },
  async (input) => {
    let lastError = null;
    const maxRetries = 2;
    
    for (let i = 0; i <= maxRetries; i++) {
      try {
        const { output } = await discordServerArchitectPrompt(input);
        if (!output) {
          throw new Error('No output received from AI model.');
        }
        return output;
      } catch (error: any) {
        lastError = error;
        const msg = (error.message || '').toLowerCase();
        
        // Don't retry on configuration errors (like 404 model not found)
        if (msg.includes('404') || msg.includes('not found')) {
          throw new Error(`Architect Configuration Error: The specified AI model was not found. Please contact support. (Internal: ${error.message})`);
        }

        const isRetriable = msg.includes('503') || msg.includes('429') || msg.includes('unavailable') || msg.includes('rate limit');
        
        if (isRetriable && i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
          continue;
        }
        throw error;
      }
    }
    throw lastError || new Error('Failed to generate Discord server structure.');
  }
);

export async function generateDiscordServerStructure(input: GenerateDiscordServerStructureInput): Promise<GenerateDiscordServerStructureOutput> {
  return generateDiscordServerStructureFlow(input);
}
