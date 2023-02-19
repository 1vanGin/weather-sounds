import './index.scss'
import {weatherMap} from "./weatherMap";
import pauseIcon from './icons/pause.svg';
import {IdType, IPlayingState, IWeatherMap} from "./interfaces";

let playingState: IPlayingState = {
    nowPlaying: false,
    sound: '',
    url: '',
};

const player = new Audio();
player.loop = true

const playHandler = (buttonId: IdType, thisButton: HTMLButtonElement): void => {
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
    const prevButton = document.getElementById(`${playingState.sound}`) as HTMLButtonElement;
    const thisButton = document.getElementById(`${buttonId}`) as HTMLButtonElement;

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


const wrapper: HTMLElement = document.querySelector('.buttons-wrapper');
wrapper.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    const buttonTarget: HTMLButtonElement = target.nodeName === 'BUTTON' ? target : target.closest('button')
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