from enum import StrEnum


class AppRoute(StrEnum):
    LOGIN = "./login"
    REGISTRATION = "./register"
    FORGOT_PASSWORD = "./forgot-password"

    ADMIN_LOGIN = "./#/login"
    ADMIN_PRODUCT_CODES = "./#/admin/keys"