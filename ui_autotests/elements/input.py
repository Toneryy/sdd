import allure
from playwright.sync_api import expect

from elements.base_element import BaseElement
from tools.logger import get_logger

logger = get_logger("INPUT")

class Input(BaseElement):
    @property
    def type_of(self):
        return 'input'

    def fill(self, value, **kwargs):
        step = f'Filling {self.type_of} "{self.name}" with "{value}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            locator.fill(value)

    def check_have_value(self, value: str, **kwargs):
        step = f'Checking that {self.type_of} "{self.name}" has a value "{value}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            expect(locator).to_have_value(value)

    def check_have_placeholder(self, value: str, **kwargs):
        step = f'Checking that {self.type_of} "{self.name}" has a placeholder "{value}"'

        with allure.step(step):
            locator = self.get_locator(**kwargs)
            logger.info(step)
            expect(locator).to_have_attribute("placeholder", value)
