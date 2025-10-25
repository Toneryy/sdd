from components.base_component import BaseComponent

from playwright.sync_api import Page



class AdminLoginFormComponent(BaseComponent):
    def init(self, page: Page):
        self.page = page
