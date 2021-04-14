import { Message } from "discord.js";
import { VariaClient } from "./VariaClient";

interface Command extends NodeModule {
    name: string;
    description: string;
    args: boolean;
    usage: string;
    aliases: string[];
    cooldown: number;
    execute: (message: Message, args: string[], client: VariaClient) => void;
}

export { Command };