import { CommandObject, CommandType } from 'arcybot';
import { guessBuilder, guess } from './guess';

export const commandsFunctions = [guess];
export const customCommands = [guessBuilder]
export const commandsObject: CommandObject[] = [
  {
    keyword: 'guess',
    isDisabled: false,
    isModOnly: false,
    canUseInDm: true,
    description: 'Ask a yes/no question for the daily crime.',
    type: CommandType.CUSTOM,
  }
];