from enum import StrEnum
from typing import Self

from pydantic import EmailStr, HttpUrl, DirectoryPath, BaseModel, FilePath
from pydantic_settings import BaseSettings, SettingsConfigDict


class Browser(StrEnum):
    CHROMIUM = 'chromium'
    WEBKIT = 'webkit'
    FIREFOX = 'firefox'


class TestUser(BaseModel):
    email: EmailStr
    phone: str
    username: str
    password: str

class TestAdmin(BaseModel):
    login: str
    password: str


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        extra='allow',
        env_file='.env',
        env_file_encoding='utf-8',
        env_nested_delimiter='.'
    )
    admin_app_url: HttpUrl
    app_url: HttpUrl
    headless: bool
    browsers: list[Browser]
    test_user: TestUser
    videos_dir: DirectoryPath
    tracing_dir: DirectoryPath
    allure_results_dir: DirectoryPath
    test_admin: TestAdmin
    browser_state_file: FilePath

    def get_base_url(self) -> str:
        return f"{self.app_url}/"

    def get_base_admin_url(self) -> str:
        return f"{self.admin_app_url}"

    @classmethod
    def initialize(cls) -> Self:
        videos_dir = DirectoryPath("./videos")
        tracing_dir = DirectoryPath("./tracing")
        allure_results_dir = DirectoryPath("./allure-results")
        browser_state_file = FilePath("./browser-state.json")

        videos_dir.mkdir(exist_ok=True)
        tracing_dir.mkdir(exist_ok=True)
        allure_results_dir.mkdir(exist_ok=True)
        browser_state_file.touch(exist_ok=True)

        return Settings(
            videos_dir=videos_dir,
            tracing_dir=tracing_dir,
            allure_results_dir=allure_results_dir,
            browser_state_file=browser_state_file
        )


settings = Settings.initialize()
