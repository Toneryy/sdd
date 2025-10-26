import allure
from typing import Pattern
from playwright.sync_api import Page, expect

from tools.logger import get_logger

logger = get_logger("BASE_COMPONENT")


class BaseComponent:
    def __init__(self, page_frontend: Page):
        self.page = page_frontend

    def check_current_url(self, expected_url: Pattern[str]):
        step = f'Checking that current url matches with pattern {expected_url.pattern}'

        with allure.step(step):
            logger.info(step)
            expect(self.page).to_have_url(expected_url)
