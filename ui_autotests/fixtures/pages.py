import pytest
from playwright.sync_api import Page

from pages.authorization.forgot_page import ForgotPage
from pages.authorization.login_page import LoginPage
from pages.authorization.registration_page import RegistrationPage


@pytest.fixture
def login_page(page: Page) -> LoginPage:
    return LoginPage(page=page)


@pytest.fixture
def registration_page(page: Page) -> RegistrationPage:
    return RegistrationPage(page=page)


@pytest.fixture
def forgot_page(page: Page) -> ForgotPage:
    return ForgotPage(page=page)