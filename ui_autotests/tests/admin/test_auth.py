import pytest
from allure_commons.types import Severity

from config import settings
from pages.admin.authorization.auth_page import AuthPage
from tools.allure.epics import AllureEpic
from tools.allure.features import AllureFeature
from tools.allure.stories import AllureStory
from tools.app_route import AppRoute
import allure


@allure.epic(AllureEpic.ADMIN)
@allure.feature(AllureFeature.AUTHENTICATION)
@allure.story(AllureStory.LOGIN)
@allure.parent_suite(AllureEpic.ADMIN)
@allure.suite(AllureFeature.AUTHENTICATION)
@allure.sub_suite(AllureStory.LOGIN)
@pytest.mark.all
@pytest.mark.admin
class TestAuth:
    @allure.title("Successful login in admin panel")
    @allure.severity(Severity.BLOCKER)
    def test_successful_auth(self, admin_login_page: AuthPage):
        admin_login_page.visit(AppRoute.ADMIN_LOGIN)
        admin_login_page.admin_login_form.check_ui_logic()
        admin_login_page.admin_login_form.fill(login=settings.test_admin.login, password=settings.test_admin.password)
        admin_login_page.admin_login_form.click_login_button()
        admin_login_page.admin_login_form.check_successful_toast()
        admin_login_page.admin_login_form.check_admin_navigation()

    @allure.title("Auth with invalid login and valid password")
    @allure.severity(Severity.CRITICAL)
    def test_auth_with_invalid_login_and_valid_password(self, admin_login_page: AuthPage):
        admin_login_page.visit(AppRoute.ADMIN_LOGIN)
        admin_login_page.admin_login_form.fill(login="invalid", password=settings.test_admin.password)
        admin_login_page.admin_login_form.click_login_button()
        admin_login_page.admin_login_form.check_error_toast()

    @allure.title("Auth with invalid password and valid login")
    @allure.severity(Severity.CRITICAL)
    def test_auth_with_invalid_password_and_valid_login(self, admin_login_page: AuthPage):
        admin_login_page.visit(AppRoute.ADMIN_LOGIN)
        admin_login_page.admin_login_form.fill(login=settings.test_admin.login, password="invalid")
        admin_login_page.admin_login_form.click_login_button()
        admin_login_page.admin_login_form.check_error_toast()
