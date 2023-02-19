import sunIcon from './icons/sun.svg';
import rainIcon from './icons/cloud-rain.svg';
import winterIcon from './icons/cloud-snow.svg';
import summerBg from './images/summer-bg.jpg';
import rainyBg from './images/rainy-bg.jpg';
import winterBg from './images/winter-bg.jpg';
import summerSound from './sounds/summer.mp3';
import rainSound from './sounds/rain.mp3';
import winterSound from './sounds/winter.mp3';
import {IWeatherMap} from "./interfaces";

export const weatherMap: IWeatherMap = {
    summer: {
        icon: sunIcon,
        backgroundImage: summerBg,
        sound:summerSound
    },
    rain: {
        icon: rainIcon,
        backgroundImage: rainyBg,
        sound:rainSound
    },
    winter: {
        icon: winterIcon,
        backgroundImage: winterBg,
        sound: winterSound
    }
};