import { AxiosResponse } from "../typings/AxiosResponse";
import { YTData } from "../typings/YTData"; 
const axios: any = require('axios');
const ytdl = require('ytdl-core');

class YTFactory {
    static API_URL: string = 'https://youtube.googleapis.com/youtube/v3/';

    constructor(){}

    static async getSongDataByName(searchQuery: string): Promise<YTData> {
        let uriResource : string = 'search';
        let responseData : YTData = new YTData('', '', 0, '');
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&type=video&part=snippet&q=${searchQuery}`)
        .then(async (response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url =  this.generateYouTubeUri(response.data.items[0].id.videoId);
            responseData.thumbnail = response.data.items[0].snippet.thumbnails.high.url;
            let videoInfo = await ytdl.getInfo(response.data.items[0].id.videoId);
            let videoLength = parseInt(videoInfo.formats[0].approxDurationMs);
            responseData.duration = videoLength;
            return responseData;
        })
        .catch((error: any) => {
            console.error(error);
        });
        return responseData;
    }

    static generateYouTubeUri(videoId: string): string {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }

    static async getSongDataById(videoId: string): Promise<YTData>{
        let uriResource: string = 'videos';
        let responseData: YTData = new YTData('', '', 0, '');
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&part=snippet&id=${videoId}`)
        .then( async (response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url = this.generateYouTubeUri(videoId);
            responseData.thumbnail = response.data.items[0].snippet.thumbnails.high.url;
            let videoInfo = await ytdl.getInfo(videoId);
            let videoLength = parseInt(videoInfo.formats[0].approxDurationMs);
            responseData.duration = videoLength;
            return responseData;
        })
        .catch( (error: any) => {
            console.error(error);
        });
        return responseData;
    }
}

export default YTFactory;