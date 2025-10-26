import re

import pytest
from _pytest.fixtures import SubRequest
from playwright.sync_api import Page, Playwright, expect
from config import settings
from pages.admin.authorization.auth_page import AuthPage
from tools.app_route import AppRoute
from tools.initialize_browser import initialize_page


@pytest.fixture(params=settings.browsers)
def page_frontend(request: SubRequest, playwright: Playwright) -> Page:
    yield from initialize_page(
        playwright,
        base_url=settings.get_base_url(),
        test_name=request.node.name,
        browser_type=request.param
    )


@pytest.fixture(params=settings.browsers)
def page_admin(request: SubRequest, playwright: Playwright) -> Page:
    yield from initialize_page(
        playwright,
        base_url=settings.get_base_admin_url(),
        test_name=request.node.name,
        browser_type=request.param
    )

@pytest.fixture(scope='session')
def initialize_browser_state(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=settings.headless)
    context = browser.new_context(base_url=settings.get_base_admin_url())
    page = context.new_page()

    admin_login_page = AuthPage(page)
    admin_login_page.visit(AppRoute.ADMIN_LOGIN)
    admin_login_page.admin_login_form.fill(
        login=settings.test_admin.login,
        password=settings.test_admin.password
    )
    admin_login_page.admin_login_form.click_login_button()
    expect(page).to_have_url(re.compile(".*/admin/dashboard"))
    context.storage_state(path=settings.browser_state_file)
    browser.close()

@pytest.fixture(params=settings.browsers)
def page_with_state(request: SubRequest, playwright: Playwright, initialize_browser_state) -> Page:
    yield from initialize_page(
        playwright,
        base_url=settings.get_base_admin_url(),
        test_name=request.node.name,
        browser_type=request.param,
        storage_state=settings.browser_state_file
    )