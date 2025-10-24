from playwright.sync_api import Page, expect
from typing import Pattern
import allure

from config import settings


class BasePage:
    def __init__(self, page: Page):
        self.page = page

    def visit(self, url: str):
        step = f'Opening url "{settings.app_url}{url}"'.replace('.', '')


        with allure.step(step):
            self.page.goto(url)

    def reload(self):
        step = f'Reloading page with url "{self.page.url}"'

        with allure.step(step):
            self.page.reload()

    def check_current_url(self, expected_url: Pattern[str]):
        step = f'Checking that current url matches with pattern {expected_url.pattern}'

        with allure.step(step):
            expect(self.page).to_have_url(expected_url)
