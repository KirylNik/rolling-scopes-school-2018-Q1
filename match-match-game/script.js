class matchMatchGame {

    constructor(cardsBack) {
        this.numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Массив чисел, для генерации случайного массива.
        this.randomArr = []; // Тут будем хранить сгенерированным массив случайных чисел.
        this.animateFlag = false; // Флаг того, что в данный момент происходит анимация перевёртывания карты и обратывать клики не нужно.
        this.hideCards = 0;  // Тут будем считать количество спрятанных карт.
        this.timeGameStart = {};  // Счётчик начала игры.
        this.selectBackCard = 0; // Выбраная рубашка карты.
        this.cardBackArray = [...cardsBack]; // Массив рубашек карт.
        this.prevCards; // Класс прудыдущей открытой карты.
        this.prevCardsID; // Уникальный идентификатор предыдущей открытой карты.
        this.createButtonNext(); // Установить обработчик кнопке Next на главной странице.
        this.writeStartPreview();
        this.handlerBackCardSlider();
        this.addKeyboardControl();
    }
    // Обработчик кнопки Next на главной странице.
    createButtonNext() {
        /* При нажатии на кнопку контейнер с правилами скрывается, контейнер с настройками отображается.
        Затем устанвавливается обработчик для кнопки назад, кнопки впёрёд второго этапа
        и обработчик для секции выбора сложности игры. */
        let buttonNextHundler = () => {
            document.body.querySelector('.rules-container').style.display = 'none';
            document.body.querySelector('.start-settings-container').style.display = 'flex';
        }
        document.body.querySelector('.button-next').addEventListener('click', buttonNextHundler);
        this.createButtonBack();
        this.createButtonNextStep2();
        this.fillSelectDifficultyContainer();
    }
    // Обработчик кнопки Back на странице настроек.
    createButtonBack() {
        let buttonBackHundler = () => {
            document.body.querySelector('.rules-container').style.display = 'block';
            document.body.querySelector('.start-settings-container').style.display = 'none';  
        }
        document.body.querySelector('.button-back').addEventListener('click', buttonBackHundler);
    }
    // Обработчик секции выбора сложности игры.
    fillSelectDifficultyContainer() {
        // Устанавливает в localStorage значение сложности игры.
        let selectDifficultyHundler = (event) => {
            if (event.target.classList[1] == 'difficulty-level-easy') {
                localStorage.setItem('currentDifficulty', `5`);
            } else if (event.target.classList[1] == 'difficulty-level-normal') {
                localStorage.setItem('currentDifficulty', `9`);
            } else {
                localStorage.setItem('currentDifficulty', `12`);
            };
            // Получает все выделенные элементы и сбрасывет настройки выделения.
            this.difficultyLevelButtons = document.body.querySelectorAll(`.difficulty-level-selected`);
            if (this.difficultyLevelButtons.length > 0) {
                for (const key in [...this.difficultyLevelButtons]) {
                    this.difficultyLevelButtons[key].classList.toggle('difficulty-level-selected');
                };
            }; 
            // Устанавливет класс difficulty-level-selected (выделяет) выбранному мышью элементу.
            document.body.querySelector(`.${event.target.classList[1]}`).classList.toggle('difficulty-level-selected');
        };
        document.body.querySelector('.select-difficulty-level-container').addEventListener('click', selectDifficultyHundler);
    }
    // Обработчик кнопки Next на странице настроек.
    createButtonNextStep2() {
        let buttonNextStep2Hundler = () => {
            // Записываем данные из формы о клиенте в соответствующие поля localStorage.
            localStorage.setItem('userFirstName', document.forms["registration-form-1"].elements["first-name"].value);
            localStorage.setItem('userLastName', document.forms["registration-form-1"].elements["last-name"].value);
            localStorage.setItem('userEmail', document.forms["registration-form-1"].elements["email"].value);
            // На основе выбранной игроком сложности устанавливаем подходяшие размеры основного контейнера.
            document.body.querySelector('.start-settings-container').style.display = 'none';
            if (localStorage.getItem('currentDifficulty') == 5) {
                document.body.querySelector('.main-container').style.width = '690px';
                document.body.querySelector('.main-container').style.height = '370px';
            } else if (localStorage.getItem('currentDifficulty') == 9) {
                document.body.querySelector('.main-container').style.width = '840px';
            };
            document.body.querySelector('.game-page').style.display = 'block';
            document.body.querySelector('.button-back-to-start').style.display = 'block';
            /* Генерируем случайный массив, создаём контейнеры для карт
            и в каждом из них контейнер для её переворота.
            Устанавливаем обработчик для кнопки возврата к старту игры. */
            this.fillingRandomArr();
            this.fillingRandomArr();
            this.createCardsContainer();
            this.createRotateContainers();
            this.createButtonBackToStart();
            // Устанавливем выбранный ранее игроком фон-рубашку для кажой карты.
            this.arrRotate = document.body.querySelectorAll('.rotate');
            for (let i = 0; i < this.arrRotate.length; i++) {
                this.arrRotate[i].style.backgroundImage = `url(image/back-cards/${this.selectBackCard}.jpg`;
            }
            // Засекаем время начала игры.
            this.timeGameStart = new Date();
        };
        document.body.querySelector('.button-next-step-2').addEventListener('click', buttonNextStep2Hundler);
    }
    // Герерируем случайный массив.
    fillingRandomArr()  {
        this.startArr = [...this.numberArr];
        // Получаем сложность игры - колличество уникальных карт в игре.
        this.size = localStorage.getItem('currentDifficulty');
        /* Умножаем случайное число на колличество уникальных карт в игре, округляем его.
        Полеченное значение splice`им из массива слуачнх чисел, что бы потом не получить его вновь.
        Уменьшаем колличество оставшихся карт.*/
        while (this.size > 0) {
            this.randomElem = this.startArr.splice(Math.floor(Math.random() * this.size), 1);
            this.randomArr.push(this.randomElem[0]);
            this.size--;
        }
    }
    // Создаёт контейнер для всех карт и его обработчик.
    createCardsContainer() {
        debugger;
        this.tempArr = [...this.randomArr];
        this.cardsContainer = document.body.querySelector('.game-page');
        // Взять случайный элемент из this.tempArr (копия массива случайных чисел) и поместить в i-тое место на поле игры.
        for (let i = this.randomArr.length; i > 0; i--) {
            this.randomElem = this.tempArr.splice(Math.floor(Math.random() * i), 1);
            this.cardsContainer.insertAdjacentHTML(`beforeEnd`, `<div class="rotate-container"><div class="rotate"><img src="" alt=""><div class="front-card card${this.randomElem[0]}" id="card#${i}"><img src="image/front-cards/${this.randomElem[0]}.jpg" class="stub--stub card${this.randomElem[0]}" alt=""></div></div></div>`);
        };
        // Обработчик кликов контейнера для всех карт.
        let cardsContainerHundler = (e) => {
            /* Если сейчас не происходит анимация открытия другой карты
            (контроль нужен для того что бы не открывать одновременно много карт)
            и обработчик сработал не на фоне карт */
            if (!this.animateFlag && e.target.className != 'game-page') {
                // Установить флаг того, что сепйчас происходит анимация и обработка.
                this.animateFlag = true;
                // Задерживает отображение карты перед закрытием на 1000мс.
                setTimeout(() => {
                // Если не установлен this.prevCards (флаг предудущей неотгаданной карты).
                if (!this.prevCards) {
                    /* Установить класс этой карты в флаг неотгаданной карты
                    (нужен для контроля, не нажата ли затем эта карта повторно,
                    если нажата - игнорировать. */
                    this.prevCards = e.target.className.slice(15);
                    // Установлен уникальный ID этой карты в уникальный ID предудущей неотгаданной карты.
                    this.prevCardsID = e.target.id;
                } else if (
                    /* Иначе если класс открытой карты совнадает с классом предыдущей открытой
                    и уникальный ID открытой карты не совпадает с уникальным ID предыдущей (то есть
                    нажатие произошло не повторно по той же карте) */
                    this.prevCards === e.target.className.slice(15)
                    && this.prevCardsID != e.target.id
                ) {
                    // Скрыть обе одинаковые карты.
                    this.openCardsArr = document.body.querySelectorAll(`.${e.target.className.slice(11)}`);
                    this.openCardsArr[0].parentElement.parentElement.style.opacity = 0;
                    this.openCardsArr[2].parentElement.parentElement.style.opacity = 0;
                    // Инкрементировать счётчик отгаданных карт.
                    this.hideCards ++;
                    // Обнулить значения предыдущей неоткрытой карты.
                    this.prevCards = null;
                    this.prevCardsID = null;
                    // Если счётчик отгаданных пар карт равен сложности игры(колличесьву уникальных карт).
                    if (this.hideCards == localStorage.getItem('currentDifficulty')) {
                        // Инициировать оканчание игры и вывод таблицы результатов.
                        this.finishGameHudler ();
                    }
                } else {
                    this.openCardsArr = document.body.querySelectorAll(`.${e.target.className.slice(11)}`);
                    this.openCardsArr[0].parentElement.style.transform = '';
                    this.openCardsArr[2].parentElement.style.transform = '';

                    this.openCardsArr = document.body.querySelectorAll(`.front-card .card${this.prevCards}`);
                    if (this.openCardsArr.length > 0) {
                        this.openCardsArr[0].parentElement.parentElement.style.transform = '';
                        this.openCardsArr[1].parentElement.parentElement.style.transform = '';
                    }
                    
                    this.prevCards = null;
                    this.prevCardsID = null;
                }
                this.animateFlag = false;
                }, 1000);
            };
        };
        this.cardsContainer.addEventListener('click', cardsContainerHundler);
    }

    finishGameHudler () {
        //Если в localStorage нету параметра 'gamers', то установить.
        if (localStorage.getItem('gamers') === null) {
            localStorage.setItem('gamers', JSON.stringify({}));
        }
        // Получить объект со списком игроков.
        this.returnObjGamers = JSON.parse(localStorage.getItem('gamers'));
        // Добавить в объект со списком игроков информацию о текущем игроке и результаты игры.
        this.returnObjGamers[`${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')} ${localStorage.getItem('difficultyGame')}`] = {};
        this.returnObjGamers[`${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')} ${localStorage.getItem('difficultyGame')}`]['name'] = `${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')}`;
        this.returnObjGamers[`${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')} ${localStorage.getItem('difficultyGame')}`]['gameData'] = new Date();
        this.returnObjGamers[`${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')} ${localStorage.getItem('difficultyGame')}`]['difficultyGame'] = localStorage.getItem('currentDifficulty');
        this.returnObjGamers[`${localStorage.getItem('userFirstName')} ${localStorage.getItem('userLastName')} ${localStorage.getItem('difficultyGame')}`]['timeGame'] = (Date.now() - this.timeGameStart);
        localStorage.setItem('gamers', JSON.stringify(this.returnObjGamers));
        // Отобразить страницу с результатами игры.
        document.body.querySelector('.game-page').innerHTML = '';
        document.body.querySelector('.game-page').style.display = 'none';
        document.body.querySelector('.main-container').style.width = '1024px';
        document.body.querySelector('.main-container').style.height = '535px';
        document.body.querySelector('.result-page').style.display = 'block';
        // Получить из localStorage результаты.
        this.gamersList = JSON.parse(localStorage.getItem('gamers'));
        // Отсортировать результаты по уровням сложности в соответствующие массивы.
        this.resultsEasyDifficulty = [];
        this.resultsNormalDifficulty = [];
        this.resultsHardDifficulty = [];
        for (let key in this.gamersList) {
            if (this.gamersList[key]['difficultyGame'] == 5) {
                this.resultsEasyDifficulty.push(this.gamersList[key])
            }
            if (this.gamersList[key]['difficultyGame'] == 9) {
                this.resultsNormalDifficulty.push(this.gamersList[key])
            }
            if (this.gamersList[key]['difficultyGame'] == 12) {
                this.resultsHardDifficulty.push(this.gamersList[key])
            }
        };
        // Заполнить таблицу для уровня сложности Easy.
        if (this.resultsEasyDifficulty.length > 0) {
            this.listResultEasyGamesInHTML = '';
            if (this.resultsEasyDifficulty.length > 1) {
                this.resultsEasyDifficulty.sort(this.sortResultGamers)
            };
            for (let i = 0; (i < this.resultsEasyDifficulty.length) && (i < 10); i++) {
                this.gameTime = new Date(this.resultsEasyDifficulty[i]['timeGame']);
                this.listResultEasyGamesInHTML += `<tr><td>${this.resultsEasyDifficulty[i]['name']}</td><td>${this.resultsEasyDifficulty[i]['gameData'].slice(0, 10)}</td><td>${this.gameTime.getMinutes()}:${this.gameTime.getSeconds()}</td></tr>`;
            }
            document.body.querySelector('.result-page').innerHTML += `<table class="result-score-table"><caption>Difficulty level: <span class="score-table-difficulty-level">Easy</span></caption><tr><th>Player name</th><th>Data of game</th><th>Play time</th></tr>${this.listResultEasyGamesInHTML}</table>`; 
        };
        // Заполнить таблицу для уровня сложности Normal.
        if (this.resultsNormalDifficulty.length > 0) {
            this.listResultNormalGamesInHTML = '';
            if (this.resultsNormalDifficulty.length > 1) {
                this.resultsNormalDifficulty.sort(this.sortResultGamers)
            };
            for (let i = 0; (i < this.resultsNormalDifficulty.length) && (i < 10); i++) {
                this.gameTime = new Date(this.resultsNormalDifficulty[i]['timeGame']);
                this.listResultNormalGamesInHTML += `<tr><td>${this.resultsNormalDifficulty[i]['name']}</td><td>${this.resultsNormalDifficulty[i]['gameData'].slice(0, 10)}</td><td>${this.gameTime.getMinutes()}:${this.gameTime.getSeconds()}</td></tr>`;
            }
            document.body.querySelector('.result-page').innerHTML += `<table class="result-score-table"><caption>Difficulty level: <span class="score-table-difficulty-level">Normal</span></caption><tr><th>Player name</th><th>Data of game</th><th>Play time</th></tr>${this.listResultNormalGamesInHTML}</table>`; 
        };
        // Заполнить таблицу для уровня сложности Hard.
        if (this.resultsHardDifficulty.length > 0) {
            this.listResultHardGamesInHTML = '';
            if (this.resultsHardDifficulty.length > 1) {
                this.resultsHardDifficulty.sort(sortResultGamers)
            };
            for (let i = 0; (i < this.resultsHardDifficulty.length) && (i < 10); i++) {
                this.gameTime = new Date(this.resultsHardDifficulty[i]['timeGame']);
                this.listResultHardGamesInHTML += `<tr><td>${this.resultsHardDifficulty[i]['name']}</td><td>${this.resultsHardDifficulty[i]['gameData'].slice(0, 10)}</td><td>${this.gameTime.getMinutes()}:${this.gameTime.getSeconds()}</td></tr>`;
            }
            document.body.querySelector('.result-page').innerHTML += `<table class="result-score-table"><caption>Difficulty level: <span class="score-table-difficulty-level">Hard</span></caption><tr><th>Player name</th><th>Data of game</th><th>Play time</th></tr>${this.listResultHardGamesInHTML}</table>`; 
        };
        // Функция для сортировки по времени прохождения игры.
        function sortResultGamers(a, b) {
            if (a['timeGame'] > b['timeGame']) {
                return 1;
            }

            if (a['timeGame'] < b['timeGame']) {
                return -1;
            }
        };    
    }
    // Создать каждой карте контейнер для переворота.
    createRotateContainers () {
        this.rotateContainers = document.body.querySelectorAll('.rotate-container');
        this.rotates = document.body.querySelectorAll('.rotate');
        for (const key in this.rotateContainers) {
            if (this.rotateContainers.hasOwnProperty(key)) {
                this.rotateContainers[key].onclick = (event) => {
                    if (!this.animateFlag) {
                        this.rotates[key].style.transform = 'rotateY(180deg)';
                    }
                };
            }
        };
    }
    // Обработчик кнопки возврата к началу.
    createButtonBackToStart() {
        let buttonBackToStartHundler = () => {
            debugger;
            document.body.querySelector('.game-page').innerHTML = '';
            document.body.querySelector('.result-page').innerHTML = '';
            document.body.querySelector('.main-container').style.width = '1024px';
            document.body.querySelector('.main-container').style.height = '535px';
            document.body.querySelector('.rules-container').style.display = 'block';
            document.body.querySelector('.button-back-to-start').style.display = 'none';
            document.body.querySelector('.result-page').style.display = 'none';
            this.randomArr.length = 0;
        };
        document.body.querySelector('.button-back-to-start').addEventListener('click', buttonBackToStartHundler);
    }
    // Обработчик слайдера выборы рубашки карты.
    handlerBackCardSlider() {
        //Наполнить слайдер необходимым количеством точек.
        for (let i = 0; i < 25; i++) {
            document.body.querySelector('.dots-navigation').insertAdjacentHTML(`beforeEnd`, '<i class="fas fa-circle"></i>');
        };
        // Отметить первый элемент слайдера.
        document.body.querySelector('.dots-navigation').querySelector(`:nth-child(1)`).style.color = 'blue';
        // Получить DOM-элементы кнопок для листания слайдера.
        this.backCardNext = document.body.querySelector('.next-back-card');
        this.backCardPrev = document.body.querySelector('.prev-back-card');
        // Установить обработчик для кнопки вперёд.
        this.backCardNext.onclick = () => {
            if (this.currentNotif == this.cardBackArray.length - 1) {
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'gray';
                this.cardBackPreviewArea.style.backgroundImage = `url('image/back-cards/${this.cardBackArray[0]}')`;
                this.currentNotif = 0;
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(1)`).style.color = 'blue';
            } else {
                this.currentNotif++;
                this.cardBackPreviewArea.style.backgroundImage = `url('image/back-cards/${this.cardBackArray[this.currentNotif]}')`;
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.currentNotif})`).style.color = 'gray';
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'blue';    
            };
            this.selectBackCard = this.currentNotif;
        };
        // Установить обработчик для кнопки назад.
        this.backCardPrev.onclick = () => {
            if (this.currentNotif == 0) {
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.cardBackArray.length})`).style.color = 'blue';
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(1)`).style.color = 'gray';
                this.cardBackPreviewArea.style.backgroundImage = `url('image/back-cards/${this.cardBackArray[this.cardBackArray.length - 1]}')`;
                this.currentNotif = this.cardBackArray.length - 1;
            } else {
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.currentNotif})`).style.color = 'blue';
                document.body.querySelector('.dots-navigation').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'gray';
                this.currentNotif--;
                this.cardBackPreviewArea.style.backgroundImage = `url('image/back-cards/${this.cardBackArray[this.currentNotif]}')`;
            };
            this.selectBackCard = this.currentNotif;
        };
    }
    // Записать стартовое сообщение.
    writeStartPreview() {
        // Получить в переменную область для записи превью.
        this.cardBackPreviewArea = document.body.querySelector('.card-back-preview-area');
        // Записать в поле для превью первоё превью.
        this.cardBackPreviewArea.style.backgroundImage = `url('image/back-cards/${this.cardBackArray[0]}')`;
        // Установить флаг с номером текущего сообщения, для работы слайдера.
        this.currentNotif = 0;
    }
    // Обратка для листания и закрытия сообщений клавиатурой.
    addKeyboardControl() {
        document.onkeydown = () => {
            switch (event.keyCode) {
                case 37:
                    this.backCardPrev.onclick();
                    break;
                case 39:
                    this.backCardNext.onclick();
                    break;
            };
        };
    }

};

let cardsBack = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'];
let gameProgrammingLanguages = new matchMatchGame(cardsBack);