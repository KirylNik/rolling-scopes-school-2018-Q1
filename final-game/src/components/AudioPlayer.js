import { listAudioTrack } from './Utils';

export default class AudioPlayer {

    constructor () {
        this.audio = new Audio();
        this.currentTrack = 0;
        this.init();
    }

    init () {
        this.playInitalTrack();
        this.addHandlerAudioPlayer();
    }

    playInitalTrack () {
        const nameInitalTrack = listAudioTrack[0];
        this.audio.src = `audio/${nameInitalTrack}`;
        this.audio.play();
    }

    play () {
        this.audio.play();
    }

    pause () {
        this.audio.pause();
    }

    playNextTrack () {
        this.audio.pause();

        if (this.currentTrack < listAudioTrack.length - 1) {
            this.currentTrack++;
        } else {
            this.currentTrack = 0;
        }

        this.audio.src = `audio/${listAudioTrack[this.currentTrack]}`;
        this.audio.play();
    }

    playPrevTrack () {
        this.audio.pause();

        if (this.currentTrack === 0) {
            this.currentTrack = listAudioTrack.length - 1;
        } else {
            this.currentTrack --;
        }

        this.audio.src = `audio/${listAudioTrack[this.currentTrack]}`;
        this.audio.play();
    }
    // Add a handler for the background music menu.
    addHandlerAudioPlayer () {
        let audioPlayerButtonsContainer = document.getElementById('audio-player-buttons-container');
    
        this.handlerAudioPlayerButtons = (event) => {
            if (event.target.id === 'audio-player-button-pause') {
                this.pause();
            } else if (event.target.id === 'audio-player-button-play'){
                this.play();
            } else if (event.target.id === 'audio-player-button-next'){
                this.playNextTrack();
            } else if (event.target.id === 'audio-player-button-back'){
                this.playPrevTrack();
            }
        };

        audioPlayerButtonsContainer.addEventListener('click', this.handlerAudioPlayerButtons);
    }
}