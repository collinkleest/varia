interface QueueItemInterface {
    name: string;
    url: string;
    thumbnail: string;
    playedBy: string;
    duration: number;
    isPlaying: boolean;
}

class QueueItem implements QueueItemInterface {
    constructor(name: string, url: string, thumbnail:string, playedBy: string, duration: number, isPlaying: boolean){
        this.name = name;
        this.url = url;
        this.thumbnail = thumbnail;
        this.playedBy = playedBy;
        this.duration = duration;
        this.isPlaying = isPlaying;
    };
    public name: string;
    public url: string;
    public thumbnail: string;
    public playedBy: string;
    public duration: number;
    public isPlaying: boolean;
}

export { QueueItem };