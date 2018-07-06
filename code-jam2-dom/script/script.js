// Создаём массив строк для отображения в компоненте.
let str1 = 'Fact #1: Banging your head against a wall burns 150 calories an hour.';
let str2 = 'Fact #2: Human saliva has a boiling point three times that of regular water.';
let str3 = 'Fact #3: If you lift a kangaroo’s tail off the ground it can’t hop.';
let str4 = 'Fact #4: Bananas are curved because they grow towards the sun.';
let str5 = 'Fact #5: Billy goats urinate on their own heads to smell more attractive to females.';

let arrayNotification = [str1, str2, str3, str4, str5];

class Notification {

    constructor(arrayMess) {
        this.arrayMessage = arrayMess;
        this.createNotifiSlider();
        this.writeStartMessege();
        this.createCloseButton();
        this.addKeyboardControl();
        this.displayNotification();
    }
    // Создать в DOM слайдер.
    createNotifiSlider() {
        // Создать тело слайдера.
        document.body.querySelector('.notification-slider').innerHTML = '<i class="fas fa-angle-left button-notification button-notification-prev"></i><div class="notification-slider-points"></div><i class="fas fa-angle-right button-notification button-notification-next"></i>';
        //Наполнить слайдер необходимым количеством точек.
        for (let i = 0; i < this.arrayMessage.length; i++) {
            document.body.querySelector('.notification-slider-points').innerHTML += '<i class="fas fa-circle"></i>';
        };
        // Отметить первый элемент слайдера.
        document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(1)`).style.color = 'blue';
        // Если сообщение только одно, то скрыть слайдер.
        if (this.arrayMessage.length == 1) {
            document.body.querySelector('.notification-slider').style.display = 'none';    
        }
        // Получить DOM-элементы кнопок для листания слайдера.
        this.notificationNext = document.body.querySelector('.button-notification-next');
        this.notificationPrev = document.body.querySelector('.button-notification-prev');
        // Установить обработчик для кнопки вперёд.
        this.notificationNext.onclick = () => {
            if (this.currentNotif == this.arrayMessage.length - 1) {
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'gray';
                this.notifMessegeArea.innerHTML = this.arrayMessage[0];
                this.currentNotif = 0;
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(1)`).style.color = 'blue';
            } else {
                this.currentNotif++;
                this.notifMessegeArea.innerHTML = this.arrayMessage[this.currentNotif];
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.currentNotif})`).style.color = 'gray';
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'blue';    
            };
        };
        // Установить обработчик для кнопки назад.
        this.notificationPrev.onclick = () => {
            if (this.currentNotif == 0) {
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.arrayMessage.length})`).style.color = 'blue';
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(1)`).style.color = 'gray';
                this.notifMessegeArea.innerHTML = this.arrayMessage[this.arrayMessage.length - 1];
                this.currentNotif = this.arrayMessage.length - 1;
            } else {
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.currentNotif})`).style.color = 'blue';
                document.body.querySelector('.notification-slider-points').querySelector(`:nth-child(${this.currentNotif + 1})`).style.color = 'gray';
                this.currentNotif--;
                this.notifMessegeArea.innerHTML = this.arrayMessage[this.currentNotif];
            };
        };
    }

    createCloseButton() {
        // Получить DOM-элемент кнопки закрытия.
        this.notificationClose = document.body.querySelector('.notification-close')
        // Установить обработчик для кнопки закрытия.
        this.notificationClose.onclick = () => {
        // Если стоит галочка о запрете показа натафикации, то установить в localStorage флаг.
        if (document.body.querySelector('[name="disableNotification"]').checked) {
            localStorage.setItem('disableNotification','true')
        };
        this.elemNotification.style.display = 'none';
        };
    }
    // Записать стартовое сообщение.
    writeStartMessege() {
        // Получить в переменные сам натификатор и поле для записи текста.
        this.elemNotification = document.body.querySelector('.notification');
        this.notifMessegeArea = document.body.querySelector('.notification-messege');
        // Записать в поле для текста первое сообщение.
        this.notifMessegeArea.innerHTML = this.arrayMessage[0];
        // Установить флаг с номером текущего сообщения, для работы слайдера.
        this.currentNotif = 0;
    }
    // Обратка для листания и закрытия сообщений клавиатурой.
    addKeyboardControl() {
        document.onkeydown = () => {
            switch (event.keyCode) {
                case 27:
                    this.notificationClose.onclick();
                    break;
                case 37:
                    this.notificationPrev.onclick();
                    break;
                case 39:
                    this.notificationNext.onclick();
                    break;
            };
        };
    }
    // Отобразить натификацию, если пользователь не установил галочку о запрете показа.
    displayNotification() {
        if (!localStorage.getItem('disableNotification')) {
            this.elemNotification.style.display = 'block';
        };
    }
};
setTimeout(() => {let notificationFacts = new Notification(arrayNotification);}, 1000);

