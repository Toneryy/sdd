import pytest
from playwright.sync_api import Page

from pages.frontend.authorization.forgot_page import ForgotPage
from pages.frontend.authorization.login_page import LoginPage
from pages.frontend.authorization.registration_page import RegistrationPage


@pytest.fixture
def login_page(page_frontend: Page) -> LoginPage:
    return LoginPage(page_frontend=page_frontend)


@pytest.fixture
def registration_page(page_frontend: Page) -> RegistrationPage:
    return RegistrationPage(page_frontend=page_frontend)


@pytest.fixture
def forgot_page(page_frontend: Page) -> ForgotPage:
    return ForgotPage(page_frontend=page_frontend)
