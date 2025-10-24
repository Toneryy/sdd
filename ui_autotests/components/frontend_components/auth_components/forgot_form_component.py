import re

import allure

from components.base_component import BaseComponent
from playwright.sync_api import Page

from elements.button import Button
from elements.input import Input
from elements.link import Link
from elements.text import Text
from tools.logger import get_logger

logger = get_logger("FORGOT_FORM")


class ForgotFormComponent(BaseComponent):
    def __init__(self, page: Page):
        super().__init__(page)

        self.forgot_title_text = Text(page, 'forgot-page-title-text', 'Forgot title text')
        self.forgot_subtitle_text = Text(page, 'forgot-page-subtitle-text', 'Forgot subtitle text')
        self.email_input = Input(page, 'forgot-page-email-input', 'Email input')
        self.email_input_icon = Input(page, 'forgot-page-email-input-icon', 'Email input icon')
        self.submit_button = Button(page, 'forgot-page-submit-button', 'Submit button')
        self.login_link = Link(page, 'forgot-page-login-link', 'Login link')

    @allure.step('Checking ui logic of forgot component')
    def check_ui_logic(self):
        self.forgot_title_text.check_visible()
        self.forgot_title_text.check_have_text('Восстановление пароля')

        self.forgot_subtitle_text.check_visible()
        self.forgot_subtitle_text.check_have_text('Введите ваш email, и мы отправим вам ссылку для сброса пароля.')

        self.email_input.check_visible()
        self.email_input.check_have_placeholder('Email')
        self.email_input_icon.check_visible()

        self.submit_button.check_visible()
        self.submit_button.check_have_text('Отправить ссылку')

        self.login_link.check_visible()
        self.login_link.check_have_text('Вернуться ко входу')

    def fill(self, email: str):
        self.email_input.fill(email)

    def click_submit_button(self):
        self.submit_button.click()

    def click_login_link(self):
        self.login_link.click()
        self.check_current_url(expected_url=re.compile(".*/login"))
