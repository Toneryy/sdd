from enum import StrEnum


class AppRoute(StrEnum):
    LOGIN = "./login"
    REGISTRATION = "./register"
    FORGOT_PASSWORD = "./forgot-password"