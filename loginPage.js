"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {

    const {
        login,
        password
    } = data;
    ApiConnector.login({
        login,
        password
    }, (response) => {
        if (response.success) {
            location.reload();
        } else {

            userForm.setLoginErrorMessage("Ошибка при авторизации");
        }
    });
};

userForm.registerFormCallback = (data) => {
    const {
        login,
        password
    } = data;
    ApiConnector.register({
        login,
        password
    }, (response) => {
        if (response.success) {
            location.reload();
        } else {

            userForm.setLoginErrorMessage("Ошибка при регистрации");
        }
    });
}