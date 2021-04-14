interface QueueItemInterface {
    name: string;
    url: string;
    playedBy: string;
    duration: number;
    isPlaying: boolean;
}

class QueueItem implements QueueItemInterface {
    constructor(name: string, url: string, playedBy: string, duration: number, isPlaying: boolean){
        this.name = name;
        this.url = url;
        this.playedBy = playedBy;
        this.duration = duration;
        this.isPlaying = isPlaying;
    };
    public name: string;
    public url: string;
    public playedBy: string;
    public duration: number;
    public isPlaying: boolean;
}

export { QueueItem };