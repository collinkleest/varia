import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import {getSongByName} from "./yt-factory";

const playSongFromKeywords = async (message: Message, args: string[], client: VariaClient) => {
    let commandArguments: string = args.join(' ');
    let userId: string = message.author.id;
    let userName: string = message.author.username;
    let ytData : string[] = await getSongByName(commandArguments);
}

