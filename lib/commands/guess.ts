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

  const prompt = `${question} (Remember: answer [Y] for yes, [N] for no and [I] for invalid questions)`
  const chatId = "f28d80ac-7fd6-4c1b-9233-e7d49cbbccaa"
  const url = `http://localhost:8008/api/chat/${chatId}/question`

  await interaction.deferReply();
  const response = await axios({
    url,
    method: 'GET',
    headers: { responseType: 'stream', accept: "text/event-stream" },
    params: { prompt }
  })
  const answer = parseAnswer(response)
  const color = parseColor(answer)

  // Add the entire logic here
  interaction.editReply({
    embeds: [{
      title: question,
      color,
      footer: {
        text:`Asked by <@${interaction.user.id}>`
      },
      fields: [
        {
          name: "Answer",
          value: answer
        },
      ],
    }]
  });
};

/**
 * EMBEDS
 */
const embedError: APIEmbed = {
  title: `❌ Incorrect command`,
  fields: [
    {
      name: "___",
      value: "You have to ask a question."
    },
  ],
};
