from playwright.sync_api import Page

from components.admin_components.product_components.admin_redactor.admin_redactor_component import \
    AdminRedactorComponent
from elements.button import Button
from elements.input import Input
from elements.text import Text


class CategoriesComponent(AdminRedactorComponent):
    def __init__(self, page_with_state: Page):
        super().__init__(page_with_state)

        self.add_category_subtitle = Text(page_with_state, "products-page-redactor-add-category-title",
                                          "Add category subtitle")
        self.category_name_input = Input(page_with_state, "products-page-redactor-add-category-input",
                                         "Category name input")
        self.add_category_button = Button(page_with_state, "products-page-redactor-add-category-button",
                                          "Add category button")
        self.category_title = Text(page_with_state, "products-page-redactor-category-title", "Category title")
