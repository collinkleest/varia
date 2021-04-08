import { AxiosResponse } from "../typings/AxiosResponse";
import { YTData } from "../typings/YTData"; 
const axios: any = require('axios');

class YTFactory {
    static API_URL: string = 'https://youtube.googleapis.com/youtube/v3/';

    constructor(){}

    static async getSongDataByName(search: string): Promise<YTData> {
        let uriResource : string = 'search';
        let responseData : YTData = {title: '', url: ''};
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&type=video&part=snippet&q=${search}`)
        .then((response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url =  this.generateYouTubeUri(response.data.items[0].id.videoId);
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
        let responseData: YTData = {title: '', url: ''};
        await axios.get(`${this.API_URL}${uriResource}?key=${process.env.YT_API_KEY}&part=snippet&id=${videoId}`)
        .then( (response: AxiosResponse) => {
            responseData.title = response.data.items[0].snippet.title;
            responseData.url = this.generateYouTubeUri(videoId);
            return responseData;
        })
        .catch( (error: any) => {
            console.error(error);
        });
        return responseData;
    }
}

export default YTFactory;