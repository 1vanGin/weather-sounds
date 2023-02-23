import './index.scss'
import {weatherMap} from "./weatherMap";
import pauseIcon from './icons/pause.svg';
import {IdType, IPlayingState, IWeatherMap} from "./interfaces";

let playingState: IPlayingState = {
    nowPlaying: false,
    sound: '',
    url: '',
};

const player: HTMLAudioElement = new Audio();
player.loop = true

const playHandler = (buttonId: IdType, thisButton: HTMLElement): void => {
    // Заполняем состояние
    playingState = {
        ...playingState,
        nowPlaying: true,
        sound: buttonId,
        url: `${weatherMap[buttonId].sound}`
    }
    // Меняем источник звука, если ничего нет или играет другой
    if (player.src === '' || `${playingState.url}` !== player.src) {
        player.src = playingState.url;
        document.body.style.backgroundImage = `url('${weatherMap[buttonId].backgroundImage}')`
    }

    player.play();
    changeIcon('pause', thisButton);
}

const pauseHandler = (buttonId: IdType): void => {
    const prevButton: HTMLElement = document.getElementById(`${playingState.sound}`);
    const thisButton: HTMLElement = document.getElementById(`${buttonId}`);

    //Ставим на паузу
    if (playingState.sound === buttonId) {
        player.pause();
        playingState.nowPlaying = false
        changeIcon(buttonId, thisButton)
    } else {
        // Отключаем звук пред. кнопки, обнуляем состояние и запускаем другой
        changeIcon(playingState.sound, prevButton)
        player.pause();
        player.currentTime = 0;
        player.src = ''
        playingState = {
            ...playingState,
            nowPlaying: false,
            sound: '',
            url: '',
        }
        playHandler(buttonId, thisButton)
    }
}

function changeIcon(iconType: string | IdType, thisButton: HTMLElement) {
    switch (iconType) {
        case 'pause':
            thisButton.querySelector("img").src = pauseIcon;
            break;
        default:
            thisButton.querySelector("img").src = `${weatherMap[iconType as keyof IWeatherMap].icon}`;
            break;
    }
}


const wrapper = document.querySelector('.buttons-wrapper') as HTMLDivElement;
wrapper.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement | null
    const buttonTarget: HTMLElement = target.nodeName === 'BUTTON' ? target : target.closest('button')
    const isButton: boolean = buttonTarget.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    const buttonId: IdType = buttonTarget.id as IdType
    if (playingState.nowPlaying) {
        pauseHandler(buttonId)
    } else {
        playHandler(buttonId, buttonTarget);
    }
})

const volume = document.getElementById('volume-controller') as HTMLInputElement;
volume.addEventListener('input', (e) => {
    const curTarget = e.currentTarget as HTMLInputElement;
    player.volume = Number(curTarget.value) / 100;
});