import allure
from playwright.sync_api import Page, expect

from tools.logger import get_logger

logger = get_logger("BASE_ELEMENT")

class BaseElement:
    def __init__(self, page: Page, locator: str, name: str):
        self.page = page
        self.locator = locator
        self.name = name

    @property
    def type_of(self):
        return "base element"

    def get_locator(self):
        locator = self.locator
        step = f'Getting locator with "data-testid={locator}"'

        with allure.step(step):
            logger.info(step)
            return self.page.get_by_test_id(locator)

    def click(self):
        step = f'Clicking {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator()
            logger.info(step)
            locator.click()

    def check_visible(self):
        step = f'Checking visible {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator()
            logger.info(step)
            expect(locator).to_be_visible()

    def check_have_text(self, text: str):
        step = f'Checking that {self.type_of} "{self.name} has text "{text}"'

        with allure.step(step):
            locator = self.get_locator()
            logger.info(step)
            expect(locator).to_have_text(text)

    def hover(self):
        step = f'Hovering at {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator()
            logger.info(step)
            locator.hover()

