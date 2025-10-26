import pytest
from playwright.sync_api import Page

from pages.admin.products.products_codes_page import ProductsCodesPage
from pages.frontend.authorization.forgot_page import ForgotPage
from pages.frontend.authorization.login_page import LoginPage
from pages.frontend.authorization.registration_page import RegistrationPage
from pages.admin.authorization.auth_page import AuthPage


@pytest.fixture
def login_page(page_frontend: Page) -> LoginPage:
    return LoginPage(page_frontend=page_frontend)


@pytest.fixture
def registration_page(page_frontend: Page) -> RegistrationPage:
    return RegistrationPage(page_frontend=page_frontend)


@pytest.fixture
def forgot_page(page_frontend: Page) -> ForgotPage:
    return ForgotPage(page_frontend=page_frontend)


@pytest.fixture
def admin_login_page(page_admin: Page) -> AuthPage:
    return AuthPage(page_admin=page_admin)

@pytest.fixture
def product_page(page_with_state: Page) -> ProductsCodesPage:
    return ProductsCodesPage(page_with_state=page_with_state)
