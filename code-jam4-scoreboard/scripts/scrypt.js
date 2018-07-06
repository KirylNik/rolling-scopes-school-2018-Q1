  // Функция для загрузки JSON.
  let getJSON = function(url/*, callback*/) {
    return fetch(url)
      .then((response) => response.json())
  };
  // Объекты для сессий и пользователей.
  let sessions = {};
  let users = {};

  let loadData = () => {
    loadSessions()
    .then(() => loadUsers())
    .then(() => dispayResults(0))
  }

  let loadSessions = () => {
    return getJSON('https://raw.githubusercontent.com/rolling-scopes-school/KirylNik-2018Q1/code-jam4-scoreboard/code-jam4-scoreboard/json/sessions.json?token=Aiu69vsuZXqeSb81P8kSeXVVa0YHu30dks5bCVuIwA%3D%3D')
      .then((data) => {sessions = data})
      .catch((error) => alert('Something went wrong: ' + error))
  }

  let loadUsers = () => {
    return getJSON('https://raw.githubusercontent.com/rolling-scopes-school/KirylNik-2018Q1/code-jam4-scoreboard/code-jam4-scoreboard/json/users.json?token=Aiu69q2NcVMXCeFkGEI7sBe16pG2Zbqxks5bCX5swA%3D%3D')
      .then((data) => {users = data})
      .catch((error) => alert('Something went wrong: ' + error))
  }

  // Загружаем пользователей и сессии в соотетствующие объекты.
  loadData()
  
  // Список имён задаий.
  let puzzlesList = [];
  // Массив с данными выбранных пользователей для их визуализации в графике.
  let dataUsersGrahp = [];
  // Получаем таблицу для заполнения.
  let table = document.body.querySelector(".users-result");

  // Функция создания таблицы (получаем номер желаемой для визуализации сессии игры).
  function dispayResults(sess) {
      // Получаем шапку таблицы для заполнения.
      let tableHeader = document.body.querySelector(".users-result-header");
      /* Итерируемся по раундам игры, записываем их название в шапку таблицы, заполняя её,
      а так же накапливаем их в массиве, для последующей передачи в функцию визуализации графика, как ось X. */
      let sessionsRoundsLength = sessions[sess]["rounds"].length;
      for (let i = 0; i < sessionsRoundsLength; i++) {
          tableHeader.insertAdjacentHTML(`beforeEnd`, `<th>${sessions[sess].puzzles[i].name}</th>`);
          puzzlesList.push(sessions[sess].puzzles[i].name);
      };
      tableHeader.insertAdjacentHTML(`beforeEnd`, `<th>${'Общее время'}</th>`);
      tableHeader.insertAdjacentHTML(`beforeEnd`, `<th>${'Comparison'}</th>`);
      // Итерируемся по всем игрокам и заполняем таблицу их результатами.
      let usersLength = users.length;
      for (let i = 0; i < usersLength; i++) {
          // Здесь будем сохранять результаты игрока в виде суммы и массива.
          let userScore = 0;
          let userScoreHistory = [];
          // Создаём и наполняем строку таблицы для игрока.
          let tableRow = document.createElement("tr");
          // Записываем первым значением его имя.
          tableRow.insertAdjacentHTML(`beforeEnd`, `<td>${users[i].displayName}</td>`);
          // Итерируемся по раундам игры и берём результаты игрока.
          for (let y = 0; y < sessionsRoundsLength; y++) {
              // Если игрок не учавствовал и ответил неверно, то записать ему в результат масимальные 150 секунд.
              if (
                sessions[sess].rounds[y].solutions[users[i].uid] === undefined
                ||sessions[sess].rounds[y].solutions[users[i].uid].correct === 'Incorrect'
              ) {
                  tableRow.insertAdjacentHTML(`beforeEnd`, `<td>${150}</td>`);
                  userScore += 150;
                  userScoreHistory.push(150);
              /*Иначе суммировать результатат этого раунда с общей суммой очков,
              сохранить результат раунда в массиве 'userScoreHistory'. */
              } else {
                  /* Записать в 'title' ячейки таблицы тот селектор, который ввёл игрок во время игры,
                  для его отображения при наведении на ячейку. */
                  tableRow.insertAdjacentHTML(`beforeEnd`, `<td title="${sessions[sess].rounds[y].solutions[users[i].uid].code}">${sessions[sess].rounds[y].solutions[users[i].uid].time.$numberLong}</td>`);
                  userScore += +(sessions[sess].rounds[y].solutions[users[i].uid].time.$numberLong);
                  userScoreHistory.push(+(sessions[sess].rounds[y].solutions[users[i].uid].time.$numberLong));
              };
          };
          // Записать сумму очков игрока.
          tableRow.insertAdjacentHTML(`beforeEnd`, `<td>${userScore}</td>`);
          /* Создать в последней ячейке checkbox, для выбора этой строки (игрока), как отображаемого в
          в графике визуализации. Записать в 'value' имя игрока, в data-атрибут массив его результатов как JSON-строку. */
          tableRow.insertAdjacentHTML(`beforeEnd`, `<td><input type="checkbox" name="checkbox-comparison" value="${users[i].displayName}" data-score=${JSON.stringify(userScoreHistory)}></td>`);
          // Добавить строку в таблицу.
          table.append(tableRow);
      };
  };

  // Обработчик кликов на checkbox.
  let hundlerCheckboxComparison = (event) => {
      if (event.target.name = "checkbox-comparison") {
          // Создать, заполнить и вернуть объект с настройками для отображения графика результатов пользователя.
          let propertyUserGraph = {};
          propertyUserGraph.label = event.target.value;
          propertyUserGraph.data = JSON.parse(event.target.getAttribute('data-score'));
          propertyUserGraph.backgroundColor = `rgb(${propertyUserGraph.data[2]}, ${propertyUserGraph.data[3]}, ${propertyUserGraph.data[4]})`;
          propertyUserGraph.borderColor = propertyUserGraph.backgroundColor;
          dataUsersGrahp.push(propertyUserGraph);
      }
      // Установить для всех графиков отображение линий без нижнего фона.
      Chart.defaults.global.elements.line.fill = false;

      let ctx = document.getElementById('myChart').getContext('2d');
      /* Отрисовать график на основе массива списка раундов (puzzlesList) и
      массива с объектами результатов игроков */
      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: puzzlesList,
            datasets: dataUsersGrahp,
        },
        // Configuration options go here
        options: {}
    });
  }
  table.addEventListener('click', hundlerCheckboxComparison);

  // Установить обработчик для кнопки выбора сессии.
  let selectSessionHandler = function (e) {
    e.preventDefault();
        if (document.getElementsByName("select-session")[0].checked === true) {
          document.body.querySelector(".users-result").innerHTML = `<tr class="users-result-header"><th class="users-result-header-gamer">Имя участника</th></tr>`;
          dispayResults(0);
        } else {
          document.body.querySelector(".users-result").innerHTML = `<tr class="users-result-header"><th class="users-result-header-gamer">Имя участника</th></tr>`;
          dispayResults(1);
        };
  };
  let buttonSelectSession = document.getElementById('selectSession');
  buttonSelectSession.addEventListener('click', selectSessionHandler);