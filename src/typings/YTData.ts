interface YTDataInterface {
    title: string;
    url: string;
    duration: number;
    thumbnail: string; 
}

class YTData implements YTDataInterface {
    constructor(title: string, url: string, duration: number, thumbnail: string){
        this.title = title;
        this.url = url;
        this.duration = duration;
        this.thumbnail = thumbnail;
    }
    public title: string;
    public url: string;
    public duration: number;
    public thumbnail: string;
}

export { YTData };