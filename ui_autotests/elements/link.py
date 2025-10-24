from elements.base_element import BaseElement

from tools.logger import get_logger

logger = get_logger("LINK")


class Link(BaseElement):
    @property
    def type_of(self):
        return "link"
