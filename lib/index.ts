import * as dotenv from 'dotenv';
import { Arcybot } from 'arcybot';

import { commandsObject, commandsFunctions, customCommands } from './commands'

dotenv.config();

const config = {
    discordToken: process.env.DISCORD_TOKEN,
    botId: process.env.BOT_ID,
  }
const bot = new Arcybot(
  config,
  commandsObject,
  commandsFunctions,
  // @ts-ignore
  customCommands
);

bot.start('Bot started!');