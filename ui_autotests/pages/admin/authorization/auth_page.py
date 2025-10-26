from components.admin_components.auth.admin_login_form_component import AdminLoginForm
from pages.base_page import BasePage
from playwright.sync_api import Page


class AuthPage(BasePage):
    def __init__(self, page_admin: Page):
        super().__init__(page_admin)

        self.admin_login_form = AdminLoginForm(page_admin)
