import { game } from './index.js';

// Interface management class.
export default class ControlInterface {

    init () {
        this.addHundlerButtonRun();
        this.addHundlerButtonCloseWindow();
        this.addHundlerButtonTypeAct('attack');
        this.addHundlerButtonTypeAct('epic-attack');
        this.addHundlerButtonTypeAct('potions');
        this.addHundlerButtonConcreteTypeAct();
        this.addHundlerAudioPlayer();
    }
    // Add a Handler for the Run Button.
    addHundlerButtonRun () {
        let buttonRun = document.getElementById('button-run');
        buttonRun.addEventListener('click', this.hundlerButtonRun);
    }

    hundlerButtonRun () {
        let selectAction = document.getElementById('select-action');
        let modalWindowBackground = document.getElementById('modal-window-background');
        
        selectAction.classList.toggle('displayBlock');
        modalWindowBackground.classList.toggle('displayBlock');
        setTimeout(function () {
            selectAction.classList.toggle('select-action-animate-appear'); 
        },0);
    }
    // Add a handler for the button closing the action selection and task solving windows.
    addHundlerButtonCloseWindow () {
        let buttonCloseWindow = document.body.querySelectorAll('.select-action-close');
        buttonCloseWindow.forEach((item) => {
            item.addEventListener('click', this.hundlerButtonCloseWindow.bind(this));
        });
    }
    // Close button handler
    hundlerButtonCloseWindow (event) {
        let closedElem;

        if (event) {
            closedElem = event.target.parentElement;
        } else {
            closedElem = document.getElementById('task-container');
            let taskResultContainer = document.getElementById('taskResultContainer');
            document.body.removeChild(taskResultContainer);
        }

        if (closedElem.classList.contains('select-action-animate-appear')) {
            closedElem.classList.remove('select-action-animate-appear');
        } else {
            closedElem.classList.remove('task-container-animate-appear');
        }

        this.wrapperHideClosedElem = this.hideClosedElem.bind(this, closedElem);
        closedElem.addEventListener('transitionend', this.wrapperHideClosedElem)
    }

    hideClosedElem (closedElem) {
        let modalWindowBackground = document.getElementById('modal-window-background');

        closedElem.classList.remove('displayBlock');
        modalWindowBackground.classList.remove('displayBlock');
        game.answerContainer.clear();
        closedElem.removeEventListener('transitionend', this.wrapperHideClosedElem)
    }
    // Add a handler for action buttons.
    addHundlerButtonTypeAct (typeAct) {
        let buttonTypeAct = document.getElementById(`menu-action-button-${typeAct}`);
        buttonTypeAct.addEventListener('click', this.hundlerButtonTypeAct.bind(this, typeAct));
    }

    hundlerButtonTypeAct (typeAct) {
        let selectAction = document.getElementById('select-action');

        game.player.selectedTypeAction = typeAct;
        this.wrapperDisplayMenuTypeAct = this.displayMenuTypeAct.bind(this, typeAct, selectAction);
        selectAction.addEventListener('transitionend', this.wrapperDisplayMenuTypeAct);
        selectAction.classList.toggle('select-action-animate-appear');
    }

    displayMenuTypeAct (typeAct, selectAction) {
        let newMenuTypeAct = document.getElementById(`select-${typeAct}`);

        selectAction.classList.toggle('displayBlock');
        newMenuTypeAct.classList.toggle('displayBlock');
        setTimeout(function () {
            newMenuTypeAct.classList.toggle('select-action-animate-appear');
        },0);
        selectAction.removeEventListener('transitionend', this.wrapperDisplayMenuTypeAct);
    }
    // Add a handler for the buttons to select a particular type of impact.
    addHundlerButtonConcreteTypeAct () {
        let actionTypeContainers = document.body.querySelectorAll('.menu-action-type-container'); 
        actionTypeContainers.forEach((item) => {
            item.addEventListener('click', this.hundlerButtonConcreteTypeAct.bind(this));
        });
    }

    hundlerButtonConcreteTypeAct (event) {
        if (event.target.classList.contains('concrete-type-act-button')) {
            let selectActionContainer = event.target.parentElement.parentElement.parentElement;

            game.player.selectedAction = this.getTypeSelectedAction(event);
            this.wrapperDisplayTaskContainer = this.displayTaskContainer.bind(this, event, selectActionContainer);
            selectActionContainer.addEventListener('transitionend', this.wrapperDisplayTaskContainer);
            selectActionContainer.classList.toggle('select-action-animate-appear');
        };
    }

    displayTaskContainer (event, selectActionContainer) {
        let taskContainer = document.getElementById('task-container');

        taskContainer.classList.toggle('displayBlock');
        selectActionContainer.classList.toggle('displayBlock');
        setTimeout(function () {
            game.createNewTask(event);
            taskContainer.classList.toggle('task-container-animate-appear');
        },50);
        selectActionContainer.removeEventListener('transitionend', this.wrapperDisplayTaskContainer);
    }
    // Add a handler for the background music menu.
    addHundlerAudioPlayer () {
        let audioContainer = document.getElementById('audio-container');
        let contentAudioContainer = [...audioContainer.children];
        let audioPlayerButtonsContainer = document.getElementById('audio-player-buttons-container');
        let currentTrack = 1;
    
        this.hundlerAudioPlayerButtons = (event) => {
            if (event.target.id === 'audio-player-button-pause') {
                contentAudioContainer[currentTrack].pause();
            } else if (event.target.id === 'audio-player-button-play'){
                contentAudioContainer[currentTrack].play();
            } else if (event.target.id === 'audio-player-button-next'){
                contentAudioContainer[currentTrack].pause();
                contentAudioContainer[currentTrack].currentTime = 0;
                if (currentTrack < contentAudioContainer.length - 1) {
                    currentTrack++;
                    contentAudioContainer[currentTrack].play();
                } else {
                    currentTrack = 0;
                    contentAudioContainer[currentTrack].play();
                }
            } else if (event.target.id === 'audio-player-button-back'){
                contentAudioContainer[currentTrack].pause();
                contentAudioContainer[currentTrack].currentTime = 0;
                if (currentTrack === 0) {
                    currentTrack = contentAudioContainer.length - 1;
                    contentAudioContainer[currentTrack].play();
                } else {
                    currentTrack --;
                    contentAudioContainer[currentTrack].play();
                }
            }
        };

        audioPlayerButtonsContainer.addEventListener('click', this.hundlerAudioPlayerButtons);
    }

    getTypeSelectedAction (event) {
        return event.target.parentElement.id.substr(19);
    };
}