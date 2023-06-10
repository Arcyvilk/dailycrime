# Daily Crime - Discord bot

## Initial set up

### Serge Chat

For this to work, first you have to set up Serge, powered by LLaMA.
- [tutorial how to set up Serge on Windows](https://www.howtogeek.com/881317/how-to-run-a-chatgpt-like-ai-on-your-own-pc/)
- [Serge Chat repo](https://github.com/serge-chat/serge)

Serge'd docker container needs to run for it to work. If you followed the instruction, in your http://localhost:8080 you should find the user interface for it. Download whatever model interests you and create a new chat.

**Save chat's ID from URL - you will need it later.**

### Discord Bot

To create a new Discord bot application, [follow this tutorial](https://arcyvilk.github.io/arcybot/docs/getting-started/connect-bot-to-discord).

**Save its token and client ID - you will need it later.**

1. Clone this repository
2. Navigate to root directory of the cloned repo
3. Run the following commands:
- `cp .env.example .env` - this creates an .env file. You still need to populate it with necessary config (vars that you saved before),
- `yarn` - this installs all the dependencies,
- `yarn dev` - this runs the bot.

Don't forget to actually invite the bot to the Discord server where you want to try it out.
