from pages.admin.products.products_codes_page import ProductsCodesPage
from tools.app_route import AppRoute


def test_ikikik(product_page: ProductsCodesPage):
    product_page.visit(AppRoute.ADMIN_PRODUCT_CODES)
    product_page.codes_list_component.check_key("zalupa")
