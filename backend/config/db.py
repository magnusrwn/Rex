import os
from sqlmodel import create_engine
from config.settings_config import settings
# this is where the engine is created and configed...
# this engine is then exported to the Main, which then inits the db on run of the code... this means that everything (all models in the sql_models file) are put to the db
c_args = {}
if settings.SQL_SSL_CERT_PATH:
    ssl_cert_path = os.path.abspath(settings.SQL_SSL_CERT_PATH)
    if os.path.exists(ssl_cert_path):
        c_args = {
            "ssl":{
                "ca":ssl_cert_path
            }
        }

engine = create_engine(
    settings.SQL_DATABASE_URI, # poits to the db uri
    pool_pre_ping=True, # pings the db before continuing. This checks that it is still reachable and good
    pool_recycle=3600, # replaces the connection after an hr
    pool_size=10, 
    max_overflow=10,
    echo=False,         # disable SQL logging (cheaper)
    connect_args=c_args
)