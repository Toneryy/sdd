from playwright.sync_api import Page

from components.base_component import BaseComponent
from elements.button import Button
from elements.text import Text


class AdminRedactorComponent(BaseComponent):
    def __init__(self, page_with_state: Page):
        super().__init__(page_with_state)

        self.redactor_title = Text(page_with_state, "products-page-redactor-title", "Redactor title")
        self.category_button = Button(page_with_state, "products-page-redactor-categories-button",
                                      "Categories button")
        self.products_button = Button(page_with_state, "products-page-redactor-products-button", "Products button")
        self.keys_button = Button(page_with_state, "products-page-redactor-product-keys-button", "Keys button")
        self.subscription_button = Button(page_with_state, "products-page-redactor-subscriptions-button",
                                          "Subscriptions button")

