from playwright.sync_api import Page

from components.admin_components.product_components.keys_components.codes_list_component import CodesListComponent
from pages.base_page import BasePage


class ProductsCodesPage(BasePage):
    def __init__(self, page_with_state: Page):
        super().__init__(page_with_state)

        self.codes_list_component = CodesListComponent(page_with_state)