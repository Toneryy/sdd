import allure
from playwright.sync_api import Page, expect

from tools.logger import get_logger

logger = get_logger("BASE_ELEMENT")

class BaseElement:
    def __init__(self, page_frontend: Page, locator: str, name: str):
        self.page = page_frontend
        self.locator = locator
        self.name = name

    @property
    def type_of(self):
        return "base element"

    def get_locator(self, **kwargs):
        """
        Если locator содержит шаблон {key_name}, {index} и т.п.,
        можно передать их сюда через kwargs.
        """
        if kwargs:
            locator = self.locator.format(**kwargs)
        else:
            locator = self.locator
        step = f'Getting locator with "data-testid={locator}"'

        with allure.step(step):
            logger.info(step)
            return self.page.get_by_test_id(locator)

    def click(self, **kwargs):
        step = f'Clicking {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            locator.click()

    def check_visible(self, **kwargs):
        step = f'Checking visible {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            expect(locator).to_be_visible()

    def check_have_text(self, text: str, **kwargs):
        step = f'Checking that {self.type_of} "{self.name} has text "{text}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            expect(locator).to_have_text(text)

    def hover(self, **kwargs):
        step = f'Hovering at {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            locator.hover()

