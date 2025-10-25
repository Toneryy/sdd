import allure
import pytest
from _pytest.fixtures import SubRequest
from playwright.sync_api import Page, Playwright
from config import settings
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