import { Client, Collection } from "discord.js";
import { Command } from "./Command";
import { Queue } from './Queue';

interface VariaClient extends Client {
    commands: Collection<string, Command>;
    queue: Map<string, Queue>;
    prefix: string;
    currentlyPlaying: string;
    cooldowns: Collection<string, Collection<string, number>>; 
}

export { VariaClient };
