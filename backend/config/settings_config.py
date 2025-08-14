import warnings
from typing import Annotated, Any, Literal, Type, Union
from pydantic import AnyUrl, BeforeValidator, EmailStr, HttpUrl, SecretStr, model_validator, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_ignore_empty=True, extra='ignore') # looks in the env and .env for all vars... skips empty and extra vars (skip means not throwing an err)

    # DB Settings:
    SQL_PASSWORD = SecretStr
    SQL_HOST: str
    SQL_PORT: 3306
    SQL_USER: str
    SQL_DB: str
    # used on live server... Just verifies identity(s)
    SQL_SSL_CERT_PATH: str | None = None # in certificates folder

    # the following is used in creating the engine...
    # all thats being done is: getting the password, passing that password into the uri which starts the db... self is passed to access other vars defined above...
    @property
    def SQL_DATABASE_URI(self) -> str:
        db_password = self.SQL_PASSWORD.get_secret_value()
        # this is not a callable function, but allows for 'SQL_DATABASE_URI' as a usable variable to pass into the creation of the engine.
        return f"mysql+pymysql://{self.SQL_USER}:{db_password}@{self.SQL_HOST}:{self.SQL_PORT}/{self.SQL_DB}"

    # Auth
    FERNET_KEY: str # must be encoded to bytes

    


settings = Settings()

