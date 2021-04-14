const millisToMinutesAndSeconds = (millis: number | undefined): string => {
    if (millis == undefined){
        return "0:0";
    } else {
        let minutes: number = Math.floor(millis / 60000);
        let seconds: string = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
    }
}

const playtimeToString = (streamTime: number | undefined, duration: number): string => {
    return `[${millisToMinutesAndSeconds(streamTime)} | ${millisToMinutesAndSeconds(duration)}]`;
}

const durationToString = (duration: number): string => {
    return `[${millisToMinutesAndSeconds(duration)}]`;
}

export {millisToMinutesAndSeconds, playtimeToString, durationToString};