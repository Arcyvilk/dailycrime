import { APIEmbed, SlashCommandBuilder } from 'discord.js'
import { DiscordInteraction } from 'arcybot';
import axios from 'axios';

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

  const prompt = `${question} (You can answer only YES, NO or INVALID)`
  const chatId = "c007a585-462c-499c-9ef3-7a1236d39505"
  const url = `http://localhost:8008/api/chat/${chatId}/question`

  await interaction.deferReply();
  const answer = await axios({url, method: 'GET', params: { prompt }})

  // Add the entire logic here
  interaction.editReply({
    embeds: [{
      title: `${interaction.user.username.toUpperCase()} asked a question!`,
      fields: [
        {
          name: "Question",
          value: question
        },
        {
          name: "Answer",
          value: answer.data
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
