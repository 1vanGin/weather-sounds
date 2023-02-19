export interface IWeatherMap {
    summer: IWeatherMapDetail
    rain: IWeatherMapDetail
    winter: IWeatherMapDetail
}

export interface IWeatherMapDetail {
    icon: string
    backgroundImage: string
    sound: string
}

export interface IPlayingState {
    nowPlaying: boolean,
    sound: string,
    url: string,
}


export type IdType = 'summer' | 'rain' | 'winter'