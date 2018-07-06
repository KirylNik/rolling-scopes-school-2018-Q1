// Class task for the player.
import { game } from './index.js';
import { isPartString, soundAttackPlayer, soundAttackEnemy } from './Utils.js';

export default class Task {
    // Check the player's answer.
    checkUserAnswer (correctOrderPuzzle, currentOrderPuzzle) {
        if (isPartString(correctOrderPuzzle, currentOrderPuzzle)) {
            this.displayTaskResult('Correct answer!')
            .then(() => {
                setTimeout(() => {
                    game.currentStep = 'player';
                    game.player.act();
                    soundAttackPlayer();
                }, 2000)
            })
        } else {
            this.displayTaskResult('Incorrect answer!')
            .then(() => {
                setTimeout(() => {
                    game.makeMoveEnemy();
                    soundAttackEnemy();
                }, 2000)
            })
        }
    }
    // Display the result of the player's response.
    displayTaskResult(text) {
        return new Promise((resolve, reject) => {
        let taskResultContainer = document.createElement('div');
        taskResultContainer.textContent = text;
        taskResultContainer.id = 'taskResultContainer';
        taskResultContainer.classList.add('taskResultContainer');
        if (text === 'Incorrect answer!' || text === 'You lose!') {
            taskResultContainer.classList.add('colorDarkRed');   
        }
        document.body.append(taskResultContainer);

        this.closeTaskContainer = () => {
            game.control.hundlerButtonCloseWindow();
            taskResultContainer.removeEventListener('animationend', this.closeTaskContainer);
            resolve();
        };

        taskResultContainer.classList.add('taskResultContainer-animate-appear');
        taskResultContainer.addEventListener('animationend', this.closeTaskContainer);
        })
    }
}