const logoutButton = new LogoutButton;
//Выход из личного кабинета
function performLogout() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });

};
logoutButton.action = performLogout;
//Получение информации о пользователе

function getCurrentUser() {
    ApiConnector.current((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    });

};
getCurrentUser();

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard;

function getCurrencyRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });

};
getCurrencyRates();
setInterval(getCurrencyRates, 60000);

//Операции с деньгами

const moneyManager = new MoneyManager();
//пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};
//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация выполнена успешно.");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    });
};

//перевод валюты

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(true, "Перевод выполнен успешно.");
      } else {
        moneyManager.setMessage(false, response.error); 
      }
    });
  };

//Работа с избранным

const favoritesWidget = new FavoritesWidget();

//начальный список избранного

function getInitialFavorites() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
        }
    });
}

// добавления пользователя в список избранных

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable(); 
            favoritesWidget.fillTable(response.data); 
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен в избранное.");
          } else {
            favoritesWidget.setMessage(false, response.error); 
          }
    });
};

// удаление пользователя из избранного

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable();
            favoritesWidget.updateUsersList();
            favoritesWidget.setMessage(true, "Пользователь удален из избранного.removeUserCallback");
        } else {
            favoritesWidget.setMessage(false, response.error);

        }
    });
}
