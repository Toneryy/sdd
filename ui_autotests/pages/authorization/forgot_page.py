from playwright.sync_api import Page

from components.frontend_components.auth_components.forgot_form_component import ForgotFormComponent
from pages.base_page import BasePage


class ForgotPage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)

        self.login_form = ForgotFormComponent(page)
