from playwright.sync_api import Page

from components.frontend_components.auth_components.registration_form_component import RegistrationFormComponent
from pages.base_page import BasePage


class RegistrationPage(BasePage):
    def __init__(self, page_frontend: Page):
        super().__init__(page_frontend)

        self.registration_form = RegistrationFormComponent(page_frontend)
