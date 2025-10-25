import re

import allure

from components.base_component import BaseComponent
from playwright.sync_api import Page

from elements.button import Button
from elements.icon import Icon
from elements.input import Input
from elements.link import Link
from elements.text import Text


class LoginFormComponent(BaseComponent):
    def __init__(self, page_frontend: Page):
        super().__init__(page_frontend)

        self.login_title_text = Text(page_frontend, 'login-page-login-form-title-text', 'Login title text')
        self.email_input = Input(page_frontend, 'login-page-email-input', 'Email input')
        self.email_input_icon = Icon(page_frontend, 'login-page-email-icon', 'Email input icon')
        self.password_input = Input(page_frontend, 'login-page-password-input', 'Password input')
        self.password_input_icon = Icon(page_frontend, 'login-page-password-input-icon', 'Password input icon')
        self.login_button = Button(page_frontend, 'login-page-login-button', 'Login button')
        self.forgot_password_link = Link(page_frontend, 'login-page-forgot-password-link', 'Forgot password link')
        self.registration_link = Link(page_frontend, 'login-page-registration-link', 'Registration link')

    @allure.step('Checking ui logic of login form')
    def check_ui_logic(self):
        self.login_title_text.check_visible()
        self.login_title_text.check_have_text('Войти в аккаунт')

        self.email_input.check_visible()
        self.email_input.check_have_placeholder('Email')
        self.email_input_icon.check_visible()

        self.password_input.check_visible()
        self.password_input.check_have_placeholder('Пароль')
        self.password_input_icon.check_visible()

        self.login_button.check_visible()
        self.login_button.check_have_text('Войти')

        self.forgot_password_link.check_visible()
        self.forgot_password_link.check_have_text('Забыли пароль?')

        self.registration_link.check_visible()
        self.registration_link.check_have_text('Регистрация')


    @allure.step('Filling login form')
    def fill(self, email: str, password: str):
        self.email_input.fill(email)
        self.password_input.fill(password)

    def click_login_button(self):
        self.login_button.click()
        self.check_current_url(expected_url=re.compile(".*/sdd"))

    def click_registration_link(self):
        self.registration_link.click()
        self.check_current_url(expected_url=re.compile(".*/register"))

    def click_forgot_password_link(self):
        self.forgot_password_link.click()
        self.check_current_url(expected_url=re.compile(".*/forgot-password"))
