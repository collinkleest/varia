interface AxiosResponse {
    data: YouTubeResponseData
}

interface VideoItem {
    kind: string
    etag: string
    id: {
        kind: string
        videoId: string
    }
    snippet: VideoSnippet
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface VideoSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
}

interface YouTubeResponseData {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: Array<VideoItem>
}

export { AxiosResponse };