# Daily Crime - Discord bot

## Initial set up

### Serge Chat

For this to work, first you have to set up Serge, powered by LLaMA.
- [tutorial how to set up Serge on Windows](https://www.howtogeek.com/881317/how-to-run-a-chatgpt-like-ai-on-your-own-pc/)
- [Serge Chat repo](https://github.com/serge-chat/serge)

Serge'd docker container needs to run for it to work. If you followed the instruction, in your http://localhost:8080 you should find the user interface for it. Download whatever model interests you and create a new chat.

**Save chat's ID from URL - you will need it later.**

**IMPORTANT** - for the bot to work, the pre-prompt MUST instruct it to answer exclusively with `[Y]`, `[N]` or `[I]`, including the square bracket. Otherwise it will break the regex.

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

## Example story prompt

```
We will be playing a game called Daily Crime. You will read a short crime story, and user - playing a detective - will be asking you questions about that story to guess what happened.
You are allowed to answer [Y] if the question can be answered "yes", [N] if the question can be answered "no", or [I] (with short explanation why) if the question was invalid.
A question is invalid if you are unable to answer yes or no, the question is about something else than the crime story, the question is not in English or your answer would lead the user too far from the truth.
You are not allowed to respond anything else than [Y], [N] or [I]. 
Today's story is: "A female nurse murdered a male infant. She did this because she didn't sleep for three days, having worked in a busy hospital. Infant cried so much that she went mad from exhaustion and decided to murder him. However, she made a mistake and instead of noisy baby she killed a different one - one whose father was the president of the United States."
User will be asking you questions about this story now!
```

## Other important notes

Be as specific in the provided story as possible. The story above was recreated several times to make it easier for the model and it still makes mistakes. For example, if the nurse is not specified as "female", the model is not able to determine her gender even though she is explicitly mentioned as "she". Model also is unable to derive from the context that the story most likely happened in some medical facility, and answers "INVALID" to a question if the murder happened inside a building. Model tends to answer "YES" to question like "X or Y". And so on.
