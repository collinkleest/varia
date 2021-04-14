import { Client, Collection, StreamDispatcher, VoiceConnection } from "discord.js";
import YTFactory from "../core/YTFactory";
import { Command } from "./Command";
import { QueueItem } from "./QueueItem";

interface VariaClient extends Client {
    commands: Collection<String, Command>;
    queue: Array<QueueItem>;
    prefix: string;
    currentlyPlaying: string;
    dispatcher: StreamDispatcher | undefined;
    connection: VoiceConnection | undefined;
    cooldowns: Collection<string, Collection<string, number>>; 
}

export { VariaClient };
