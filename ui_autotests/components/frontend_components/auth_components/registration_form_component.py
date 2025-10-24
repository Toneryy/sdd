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
    def __init__(self, page: Page):
        super().__init__(page)

        self.registration_title_text = Text(page, 'registration-page-create-account-title-text',
                                            'Registration title text')
        self.username_input = Input(page, 'registration-page-create-account-username-input', 'Username input')
        self.username_input_icon = Icon(page, 'registration-page-create-account-username-input-icon',
                                        'Username input icon')
        self.email_input = Input(page, 'registration-page-create-account-email-input', 'Email input')
        self.email_input_icon = Icon(page, 'registration-page-create-account-email-input-icon', 'Email input icon')
        self.phone_input = Input(page, 'registration-page-create-account-phone-input', 'Phone input')
        self.phone_input_icon = Icon(page, 'registration-page-create-account-phone-input-icon', 'Phone input icon')
        self.password_input = Input(page, 'registration-page-create-account-password-input', 'Password input')
        self.password_input_icon = Icon(page, 'registration-page-create-account-password-input-icon',
                                        'password input icon')
        self.confirm_password_input = Input(page, 'registration-page-create-account-confirm-password-input',
                                            'Confirm password input')
        self.confirm_password_input_icon = Icon(page, 'registration-page-create-account-confirm-password-input-icon',
                                                'Confirm password input icon')
        self.registration_button = Button(page, 'registration-page-create-account-registration-button',
                                          'Registration button')
        self.already_have_account_text = Text(page, 'registration-page-create-account-already-have-account-text',
                                              'Already have account text')
        self.login_link = Link(page, 'registration-page-create-account-login-link', 'Login link')

    @allure.step('Checking ui logic of registration form')
    def check_ui_logic(self):
        self.registration_title_text.check_visible()
        self.registration_title_text.check_have_text('Создать аккаунт')

        self.username_input.check_visible()
        self.username_input.check_have_placeholder('Имя')
        self.username_input_icon.check_visible()

        self.email_input.check_visible()
        self.email_input.check_have_placeholder('Email')
        self.email_input_icon.check_visible()

        self.phone_input.check_visible()
        self.phone_input.check_have_placeholder('Телефон')
        self.phone_input_icon.check_visible()

        self.password_input.check_visible()
        self.password_input.check_have_placeholder('Пароль')
        self.password_input_icon.check_visible()

        self.confirm_password_input.check_visible()
        self.confirm_password_input.check_have_placeholder('Повторите пароль')
        self.confirm_password_input_icon.check_visible()

        self.registration_button.check_visible()
        self.registration_button.check_have_text('Зарегистрироваться')

        self.already_have_account_text.check_visible()
        self.already_have_account_text.check_have_text('Уже есть аккаунт?')

        self.login_link.check_visible()
        self.login_link.check_have_text('Войти')

    @allure.step('Filling registration form')
    def fill(self, username: str, email: str, phone: str, password: str, confirm_password: str):
        self.username_input.fill(username)
        self.email_input.fill(email)
        self.phone_input.fill(phone)
        self.password_input.fill(password)
        self.confirm_password_input.fill(confirm_password)

    def click_login_link(self):
        self.login_link.click()
        self.check_current_url(expected_url=re.compile(".*/login"))

    def registration_button_click(self):
        self.registration_button.click()