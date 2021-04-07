import { AxiosResponse } from "../typings/AxiosResponse";

const axios: any = require('axios');

const YT_API_ROOT = 'https://youtube.googleapis.com/youtube/v3/';

const getSongByName =  async (name: string): Promise<string[]> => {
    let uriResource : string = 'search';
    let responseData: Array<string> = [];
    await axios.get(`${YT_API_ROOT}${uriResource}?key=${process.env.YT_API_KEY}&type=video&part=snippet&q=${name}`)
    .then((response: AxiosResponse) => {
        responseData.push(response.data.items[0].snippet.title);
        responseData.push(generateYouTubeUri(response.data.items[0].id.videoId));
        return responseData;
    })
    .catch((error: any) => {
        console.error(error);
    });
    return responseData;
}

const generateYouTubeUri = (videoId: string): string => {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

const getSongTitleById = async  (videoId: string): Promise<string> => {
    let uriResource: string = 'videos';
    let responseId: string = '';
    await axios.get(`${YT_API_ROOT}${uriResource}?key=${process.env.YT_API_KEY}&part=snippet&id=${videoId}`)
    .then( (response: AxiosResponse) => {
        responseId = response.data.items[0].snippet.title;
        return responseId;
    })
    .catch( (error: any) => {
        console.error(error);
    });
    return responseId;
}


export { getSongByName, getSongTitleById };