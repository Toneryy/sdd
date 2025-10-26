import re

from components.base_component import BaseComponent

from playwright.sync_api import Page

from elements.button import Button
from elements.input import Input
from elements.text import Text


class AdminLoginForm(BaseComponent):
    def __init__(self, page_admin: Page):
        super().__init__(page_admin)

        self.__login_title_text = Text(page_admin, 'admin-login-page-title', 'Login title text')
        self.__login_input_label = Text(page_admin, 'admin-login-page-login-label', 'Login input label')
        self.__login_input = Input(page_admin, 'admin-login-page-login-input', 'Login input')
        self.__password_input_label = Text(page_admin, 'admin-login-page-password-label', 'Password input label')
        self.__password_input = Input(page_admin, 'admin-login-page-password-input', 'Password input')
        self.__login_button = Button(page_admin, 'admin-login-page-login-button', 'Login button')
        self.__successful_toast = Text(page_admin, 'login-success-toast', 'Successful toast text')
        self.__error_toast = Text(page_admin, 'login-error-toast', 'Error toast text')

    def check_ui_logic(self):
        self.__login_title_text.check_visible()
        self.__login_title_text.check_have_text("Вход")

        self.__login_input_label.check_visible()
        self.__login_input_label.check_have_text("Логин")
        self.__login_input.check_visible()

        self.__password_input_label.check_visible()
        self.__password_input_label.check_have_text("Пароль")
        self.__password_input.check_visible()

        self.__login_button.check_visible()
        self.__login_button.check_enabled()
        self.__login_button.check_have_text("Войти")

    def fill(self, login: str, password: str):
        self.__login_input.fill(login)
        self.__password_input.fill(password)

    def click_login_button(self):
        self.__login_button.click()

    def check_successful_toast(self):
        self.__successful_toast.check_visible()
        self.__successful_toast.check_have_text("Вход выполнен успешно!")

    def check_error_toast(self):
        self.__error_toast.check_visible()
        self.__error_toast.check_have_text("Неверный логин или пароль")

    def check_admin_navigation(self):
        self.check_current_url(expected_url=re.compile(".*/#/admin"))
