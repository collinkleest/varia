import { StreamDispatcher, VoiceConnection } from "discord.js";
import { QueueItem } from "./QueueItem";

interface QueueInterface {
    dispatcher: StreamDispatcher | undefined;
    connection: VoiceConnection | undefined;
    items: Array<QueueItem>;
}

class Queue implements QueueInterface {
    constructor(){
        this.items = [];
        this.dispatcher = null;
        this.connection = null;
    }
    public dispatcher : StreamDispatcher | undefined;
    public connection : VoiceConnection | undefined;
    public items : Array<QueueItem>; 
}

export { Queue };