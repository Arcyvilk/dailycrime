import { APIEmbed, SlashCommandBuilder } from 'discord.js'
import { DiscordInteraction } from 'arcybot';
import axios from 'axios';

import { parseAnswer } from 'utils/parseAnswer';
import { parseColor } from 'utils/parseColor';

/**
 * Builder for the GUESS command 
 */
export const guessBuilder = new SlashCommandBuilder()
	.setName('guess')
	.setDescription('Ask a yes/no question for the daily crime.')
	.addStringOption(option =>
		option.setName('question')
			.setDescription('Your question.')
      .setRequired(true));

/**
 * Body of the GUESS command
 * @param interaction 
 * @returns 
 */
export const guess = async (interaction: DiscordInteraction): Promise<void> => {
  const question = interaction.options.getString('question')
  if (!question) {
    interaction.reply({
      embeds: [embedError],
      ephemeral: true
    })
    return;
  }

  try {
    await interaction.deferReply()
    
    const chatId = process.env.CHAT_ID
    const prompt = `${question} (Remember: answer [Y] for yes, [N] for no and [I] for invalid questions)`
    const url = `http://localhost:8008/api/chat/${chatId}/question`

    const response = await axios({
      url,
      method: 'GET',
      headers: { responseType: 'stream', accept: "text/event-stream" },
      params: { prompt }
    })
    const answer = parseAnswer(response)
    const color = parseColor(answer)

    interaction.editReply({
      embeds: [{
        title: question,
        color,
        author: {
          name: interaction.user.username,
          icon_url: interaction.user.avatarURL() ?? ''
        },
        fields: [{
          name: "Answer",
          value: answer
        }],
      }]
    });
  } catch (error) {
    interaction.editReply({
      embeds: [{
        title: '❌ ERROR',
        color: 15548997,
        fields: [{
          name: "---",
          value: 'Something fucked up :C'
        }]
      }]
    })
  }
};

/**
 * EMBEDS
 */
const embedError: APIEmbed = {
  title: `❌ Incorrect command`,
  fields: [
    {
      name: "---",
      value: "You have to ask a question."
    },
  ],
};
