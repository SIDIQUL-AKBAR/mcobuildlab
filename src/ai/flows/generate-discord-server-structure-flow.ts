'use server';
/**
 * @fileOverview A deterministic generator for Discord server structures.
 * This version generates blueprints locally without an external AI API for maximum reliability.
 */

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
    name: z.string(),
    type: z.string(),
    size: z.string(),
    style: z.string(),
    language: z.string(),
    description: z.string(),
  }),
  roles: z.array(z.object({
    name: z.string(),
    hex_color: z.string(),
    permissions: z.array(z.string()),
    hierarchy_level: z.number(),
    description: z.string().optional(),
  })),
  categories: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    text_channels: z.array(z.string()),
    voice_channels: z.array(z.string()),
    permissions: z.record(z.string(), z.array(z.string())),
  })),
  channels: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'announcement', 'forum', 'rules', 'welcome', 'logs', 'bot-commands']),
    parent_category: z.string(),
    topic: z.string().optional(),
    permissions: z.record(z.string(), z.array(z.string())),
  })),
  voice_channels: z.array(z.object({
    name: z.string(),
    parent_category: z.string(),
    topic: z.string().optional(),
    permissions: z.record(z.string(), z.array(z.string())),
  })),
  permissions: z.object({
    overview: z.string(),
  }),
  recommended_bots: z.array(z.object({
    name: z.string(),
    purpose: z.string(),
    config_suggestions: z.string(),
  })),
  server_settings: z.object({
    verification_level: z.string(),
    explicit_content_filter: z.string(),
    afk_timeout: z.string(),
    system_messages_channel: z.string().optional(),
    rules_channel: z.string().optional(),
    onboarding_setup: z.string().optional(),
  }),
  welcome_system: z.object({
    overview: z.string(),
    welcome_channel_name: z.string().optional(),
    auto_role_assignment: z.array(z.string()).optional(),
  }),
  security_system: z.object({
    overview: z.string(),
    moderation_actions: z.string(),
    anti_raid_measures: z.string().optional(),
    bot_security: z.string().optional(),
  }),
  growth_features: z.object({
    overview: z.string(),
    community_engagement_strategies: z.string(),
    event_ideas: z.string().optional(),
    partnership_guidelines: z.string().optional(),
  }),
});

export type GenerateDiscordServerStructureOutput = z.infer<typeof GenerateDiscordServerStructureOutputSchema>;

export async function generateDiscordServerStructure(input: GenerateDiscordServerStructureInput): Promise<GenerateDiscordServerStructureOutput> {
  // Simulate network delay for a better UX
  await new Promise(resolve => setTimeout(resolve, 1500));

  const roles = [
    { name: 'Founder', hex_color: '#FF0000', permissions: ['ADMINISTRATOR'], hierarchy_level: 100, description: 'The visionary leader of the community.' },
    { name: 'Admin', hex_color: '#E91E63', permissions: ['MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS'], hierarchy_level: 90, description: 'Server administration and management.' },
    { name: 'Moderator', hex_color: '#2ECC71', permissions: ['BAN_MEMBERS', 'KICK_MEMBERS', 'MANAGE_MESSAGES'], hierarchy_level: 80, description: 'Maintaining order and enforcing rules.' },
    { name: 'Member', hex_color: '#3498DB', permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], hierarchy_level: 10, description: 'Standard community member.' }
  ];

  if (input.serverType === 'Gaming') {
    roles.push({ name: 'Pro Gamer', hex_color: '#F1C40F', permissions: ['VIEW_CHANNEL'], hierarchy_level: 20, description: 'Veteran players with high skill.' });
  }

  const categories = [
    { 
      name: 'INFORMATION', 
      description: 'Crucial server details', 
      text_channels: ['rules', 'announcements', 'info'], 
      voice_channels: [],
      permissions: { 'Member': ['VIEW_CHANNEL'], '@everyone': ['VIEW_CHANNEL'] }
    },
    { 
      name: 'COMMUNITY', 
      description: 'The heart of the server', 
      text_channels: ['general', 'media', 'bot-commands'], 
      voice_channels: ['General Voice', 'Music Chat'],
      permissions: { 'Member': ['VIEW_CHANNEL', 'SEND_MESSAGES'] }
    }
  ];

  if (input.features.includes('Tickets')) {
    categories.push({
      name: 'SUPPORT',
      description: 'Get help from staff',
      text_channels: ['create-ticket'],
      voice_channels: [],
      permissions: { 'Moderator': ['VIEW_CHANNEL'] }
    });
  }

  const channels: any[] = [
    { name: 'rules', type: 'rules', parent_category: 'INFORMATION', topic: 'The law of the land.', permissions: {} },
    { name: 'announcements', type: 'announcement', parent_category: 'INFORMATION', topic: 'Stay updated with server news.', permissions: {} },
    { name: 'general', type: 'text', parent_category: 'COMMUNITY', topic: 'Casual conversation for everyone.', permissions: {} },
    { name: 'bot-commands', type: 'bot-commands', parent_category: 'COMMUNITY', topic: 'Interact with our automation.', permissions: {} }
  ];

  const voice_channels: any[] = [
    { name: 'General Voice', parent_category: 'COMMUNITY', topic: 'Hang out and talk.', permissions: {} },
    { name: 'Lounge', parent_category: 'COMMUNITY', topic: 'Quiet space for relaxing.', permissions: {} }
  ];

  const bots = [
    { name: 'Dyno', purpose: 'Auto-moderation and utility.', config_suggestions: 'Enable auto-mod filters and custom commands for common questions.' },
    { name: 'MEE6', purpose: 'Leveling and welcome messages.', config_suggestions: 'Setup rank rewards to encourage member activity.' }
  ];

  return {
    server_info: {
      name: input.serverName,
      type: input.serverType,
      size: input.serverSize,
      style: input.serverStyle,
      language: input.language,
      description: `A robust ${input.serverStyle} blueprint for a ${input.serverType} community. This architecture focuses on ${input.securityLevel} security and scalable ${input.staffSystem} management.`
    },
    roles,
    categories,
    channels,
    voice_channels,
    permissions: {
      overview: "Hierarchical structure with locked administrative categories and open community areas."
    },
    recommended_bots: bots,
    server_settings: {
      verification_level: input.securityLevel === 'Maximum' ? 'Very High' : 'Medium',
      explicit_content_filter: 'Scan messages from all members',
      afk_timeout: '15 minutes',
      rules_channel: '#rules'
    },
    welcome_system: {
      overview: "Automated greeting in #welcome with rules acceptance via button.",
      welcome_channel_name: "#welcome",
      auto_role_assignment: ['Member']
    },
    security_system: {
      overview: "Standard logging of all moderator actions and member join/leave events.",
      moderation_actions: "Warn -> Mute -> Kick -> Ban progression."
    },
    growth_features: {
      overview: "Incentivized engagement through leveling and community events.",
      community_engagement_strategies: "Weekly community nights and regular polls."
    }
  };
}
