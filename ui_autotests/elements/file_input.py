import allure

from tools.logger import get_logger

logger = get_logger("FILE_INPUT")

from elements.base_element import BaseElement


class FileInput(BaseElement):
    @property
    def type_of(self):
        return "file input"

    def set_input_files(self, file: str):
        step = f'Set "{file}" to the {self.type_of} "{self.name}"'

        with allure.step(step):
            locator = self.get_locator()
            logger.info(step)
            locator.set_input_file(file)
