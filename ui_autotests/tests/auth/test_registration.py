import allure
import pytest
from allure_commons.types import Severity

from config import settings
from pages.frontend.authorization.registration_page import RegistrationPage
from tools.allure.epics import AllureEpic
from tools.allure.features import AllureFeature
from tools.allure.stories import AllureStory
from tools.app_route import AppRoute


@allure.epic(AllureEpic.FRONTEND)
@allure.feature(AllureFeature.AUTHENTICATION)
@allure.story(AllureStory.REGISTRATION)
@allure.parent_suite(AllureEpic.FRONTEND)
@allure.suite(AllureFeature.AUTHENTICATION)
@allure.sub_suite(AllureStory.REGISTRATION)
@pytest.mark.all
class TestRegistration:
    @allure.title('Registration with correct email, username and password')
    @allure.severity(Severity.BLOCKER)
    def test_successful_registration(self, registration_page: RegistrationPage):
        registration_page.visit(AppRoute.REGISTRATION)
        registration_page.registration_form.check_ui_logic()
        registration_page.registration_form.fill(
            username=settings.test_user.username,
            email=settings.test_user.email,
            phone=settings.test_user.phone,
            password=settings.test_user.password,
            confirm_password=settings.test_user.password
        )
        registration_page.registration_form.registration_button_click()
