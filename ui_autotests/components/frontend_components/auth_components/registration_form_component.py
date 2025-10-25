import re

import allure
from playwright.sync_api import Page

from components.base_component import BaseComponent
from elements.button import Button
from elements.icon import Icon
from elements.input import Input
from elements.link import Link
from elements.text import Text


class RegistrationFormComponent(BaseComponent):
    def __init__(self, page_frontend: Page):
        super().__init__(page_frontend)

        self.__registration_title_text = Text(page_frontend, 'registration-page-create-account-title-text',
                                              'Registration title text')
        self.__username_input = Input(page_frontend, 'registration-page-create-account-username-input', 'Username input')
        self.__username_input_icon = Icon(page_frontend, 'registration-page-create-account-username-input-icon',
                                          'Username input icon')
        self.__email_input = Input(page_frontend, 'registration-page-create-account-email-input', 'Email input')
        self.__email_input_icon = Icon(page_frontend, 'registration-page-create-account-email-input-icon', 'Email input icon')
        self.__phone_input = Input(page_frontend, 'registration-page-create-account-phone-input', 'Phone input')
        self.__phone_input_icon = Icon(page_frontend, 'registration-page-create-account-phone-input-icon', 'Phone input icon')
        self.__password_input = Input(page_frontend, 'registration-page-create-account-password-input', 'Password input')
        self.__password_input_icon = Icon(page_frontend, 'registration-page-create-account-password-input-icon',
                                          'password input icon')
        self.__confirm_password_input = Input(page_frontend, 'registration-page-create-account-confirm-password-input',
                                              'Confirm password input')
        self.__confirm_password_input_icon = Icon(page_frontend, 'registration-page-create-account-confirm-password-input-icon',
                                                  'Confirm password input icon')
        self.__registration_button = Button(page_frontend, 'registration-page-create-account-registration-button',
                                            'Registration button')
        self.__already_have_account_text = Text(page_frontend, 'registration-page-create-account-already-have-account-text',
                                                'Already have account text')
        self.__login_link = Link(page_frontend, 'registration-page-create-account-login-link', 'Login link')
        self.__success_toast = Text(page_frontend, 'registration-page-create-account-success-toast', 'Success toast')
        self.__error_toast = Text(page_frontend, 'registration-page-create-account-error-toast', 'Error toast')

    @allure.step('Checking ui logic of registration form')
    def check_ui_logic(self):
        self.__registration_title_text.check_visible()
        self.__registration_title_text.check_have_text('Создать аккаунт')

        self.__username_input.check_visible()
        self.__username_input.check_have_placeholder('Имя')
        self.__username_input_icon.check_visible()

        self.__email_input.check_visible()
        self.__email_input.check_have_placeholder('Email')
        self.__email_input_icon.check_visible()

        self.__phone_input.check_visible()
        self.__phone_input.check_have_placeholder('Телефон')
        self.__phone_input_icon.check_visible()

        self.__password_input.check_visible()
        self.__password_input.check_have_placeholder('Пароль')
        self.__password_input_icon.check_visible()

        self.__confirm_password_input.check_visible()
        self.__confirm_password_input.check_have_placeholder('Повторите пароль')
        self.__confirm_password_input_icon.check_visible()

        self.__registration_button.check_visible()
        self.__registration_button.check_have_text('Зарегистрироваться')

        self.__already_have_account_text.check_visible()
        self.__already_have_account_text.check_have_text('Уже есть аккаунт?')

        self.__login_link.check_visible()
        self.__login_link.check_have_text('Войти')

    @allure.step('Filling registration form')
    def fill(self, username: str, email: str, phone: str, password: str, confirm_password: str):
        self.__username_input.fill(username)
        self.__email_input.fill(email)
        self.__phone_input.fill(phone)
        self.__password_input.fill(password)
        self.__confirm_password_input.fill(confirm_password)

    def click_login_link(self):
        self.__login_link.click()
        self.check_current_url(expected_url=re.compile(".*/login"))

    def registration_button_click(self):
        self.__registration_button.click()
        self.check_current_url(expected_url=re.compile(".*/login"))
