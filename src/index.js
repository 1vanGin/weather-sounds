import './index.scss'

const weatherMap = {
    summer: {
        icon: 'icons/sun.svg',
        backgroundImage: 'images/summer-bg.jpg',
        sound: 'sounds/summer.mp3'
    },
    rain: {
        icon: 'icons/cloud-rain.svg',
        backgroundImage: 'images/rainy-bg.jpg',
        sound: 'sounds/rain.mp3'
    },
    winter: {
        icon: 'icons/cloud-snow.svg',
        backgroundImage: 'images/winter-bg.jpg',
        sound: 'sounds/winter.mp3'
    }
}
const volumeInputAttributes = {
    id: 'volume',
    type: 'range',
    min: 0,
    max: 1,
    value: 0.5,
    step: 0.1,
}
let playingState = {
    nowPlaying: false,
    sound: '',
    url: '',
    hasAVolumeSlider: false
};
let player = new Audio();
player.loop = true


function createVolumeSlider(thisButton) {
    const newDiv = document.createElement("div")
    newDiv.setAttribute('class', 'volume-slider-container');
    const volumeInput = document.createElement("input");
    for (let prop in volumeInputAttributes) {
        volumeInput.setAttribute(prop, volumeInputAttributes[prop]);
    }

    thisButton.parentNode.appendChild(newDiv).appendChild(volumeInput);
    playingState.hasAVolumeSlider = true;
    volumeInput.addEventListener('mousemove', function () {
        if (player.volume !== Number(this.value)) {
            player.volume = Number(this.value)
        }
    }, false)
}

function playHandler(buttonId, thisButton) {
    const prevButton = document.getElementById(`${playingState.sound}`);
    const volumeSliderContainer = document.getElementsByClassName('volume-slider-container')[0]

    if (prevButton !== null && prevButton?.id !== thisButton?.id) {
        prevButton.parentNode.removeChild(volumeSliderContainer)
        playingState.hasAVolumeSlider = false
    }

    playingState = {
        ...playingState,
        nowPlaying: true,
        sound: buttonId,
        url: `${weatherMap[buttonId].sound}`
    }
    if (player.src === '' || `${playingState.url}` !== player.src) {
        player.src = playingState.url;
        document.body.style.backgroundImage = `url('${weatherMap[buttonId].backgroundImage}')`
    }

    player.play();
    changeIcon('pause', thisButton);
    if (!playingState?.hasAVolumeSlider) {
        createVolumeSlider(thisButton)
    }
}

function pauseHandler(buttonId) {
    const prevButton = document.getElementById(`${playingState.sound}`);
    const thisButton = document.getElementById(`${buttonId}`);
    const volumeSliderContainer = document.getElementsByClassName('volume-slider-container')[0]

    if (playingState.sound === buttonId) {
        player.pause();
        playingState.nowPlaying = false
        changeIcon(buttonId, thisButton)
    } else {
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
        prevButton.parentNode.removeChild(volumeSliderContainer)
        playingState.hasAVolumeSlider = false
        playHandler(buttonId, thisButton)
    }
}

function changeIcon(iconType, thisButton) {
    switch (iconType) {
        case 'pause':
            thisButton.querySelector("img").src = `icons/pause.svg`;
            break;
        default:
            thisButton.querySelector("img").src = `${weatherMap[iconType].icon}`;
            break;
    }
}

const wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', (event) => {

    const buttonTarget = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode
    const isButton = buttonTarget.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    const buttonId = buttonTarget.id
    if (playingState.nowPlaying) {
        pauseHandler(buttonId)
    } else {
        playHandler(buttonId, buttonTarget);
    }

})