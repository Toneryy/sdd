from elements.input import Input

from tools.logger import get_logger

logger = get_logger("TEXTAREA")


class TextArea(Input):
    @property
    def type_of(self):
        return "textarea"
