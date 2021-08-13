import { AxiosResponse } from "../typings/AxiosResponse";
import { YTData } from "../typings/YTData"; 
import axios from 'axios';
import ytdl from 'ytdl-core';

class YTFactory {
    static API_URL = 'https://youtube.googleapis.com/youtube/v3/';

    constructor(){}

    static async getSongDataByName(searchQuery: string): Promise<YTData> {
        const uriResource = 'search';
        const responseData : YTData = new YTData('', '', 0, '');
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&type=video&part=snippet&q=${searchQuery}`)
        .then(async (response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url =  this.generateYouTubeUri(response.data.items[0].id.videoId);
            responseData.thumbnail = response.data.items[0].snippet.thumbnails.high.url;
            const videoInfo = await ytdl.getInfo(response.data.items[0].id.videoId);
            const videoLength = parseInt(videoInfo.formats[0].approxDurationMs);
            responseData.duration = videoLength;
            return responseData;
        })
        .catch((error: any) => {
            console.error(error);
        });
        return responseData;
    }

    static async getSongsBySearchQuery(searchQuery : string) {
        const uriResource = 'search';
        const response : AxiosResponse = await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&type=video&part=snippet&q=${searchQuery}&maxResults=10`);
        return response;
    }

    static generateYouTubeUri(videoId: string): string {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }

    static async getSongDataById(videoId: string): Promise<YTData>{
        const uriResource = 'videos';
        const responseData: YTData = new YTData('', '', 0, '');
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&part=snippet&id=${videoId}`)
        .then( async (response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url = this.generateYouTubeUri(videoId);
            responseData.thumbnail = response.data.items[0].snippet.thumbnails.high.url;
            const videoInfo = await ytdl.getInfo(videoId);
            const videoLength = parseInt(videoInfo.formats[0].approxDurationMs);
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