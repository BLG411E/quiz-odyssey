from flask_sqlalchemy import SQLAlchemy 

from . import models

db = SQLAlchemy(model_class=models.Base)