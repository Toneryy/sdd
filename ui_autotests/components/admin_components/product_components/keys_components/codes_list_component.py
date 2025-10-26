from playwright.sync_api import Page

from components.base_component import BaseComponent
from elements.text import Text
from fixtures.browsers import page_with_state


class CodesListComponent(BaseComponent):
    def __init__(self, page_with_state: Page):
        super().__init__(page_with_state)

        self.keys_list_title = Text(page_with_state, "keys-page-keys-list-title", "Keys list title text")
        self.keys_list_keys_title = Text(page_with_state, "keys-page-keys-list-key", "Keys list keys title")
        self.keys_list_code_title = Text(page_with_state, "keys-page-keys-list-code", "Keys list code title")
        self.keys_list_product_title = Text(page_with_state, "keys-page-keys-list-product", "Keys list product title")
        self.keys_list_product_actions = Text(page_with_state, "keys-page-keys-list-actions",
                                              "Keys list product actions")

        self.keys_list_key = Text(page_with_state, "keys-page-keys-list-key-value-{key_name}",
                                  "Keys list key")
        self.keys_list_code = Text(page_with_state, "keys-page-keys-list-code-value-{key_name}", "Keys list code")
        self.keys_list_product = Text(page_with_state, "keys-page-keys-list-code-value-{key-name}", "Keys list product")
        self.keys_delete_button = Text(page_with_state, "keys-page-keys-list-delete-button-{key_name}",
                                       "Keys list delete button")
        self.pagination_previous_button = Text(page_with_state, "keys-page-keys-list-pagination-previous-button",
                                               "Pagination previous button")
        self.pagination_next_button = Text(page_with_state, "keys-page-keys-list-pagination-next-button",
                                           "Pagination next button")

    def check_key(self, key_name: str):
        self.keys_list_key.check_have_text(text=key_name, key_name=key_name)
