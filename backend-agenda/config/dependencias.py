from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models.Modelos import Base

db = SQLAlchemy(model_class=Base)
ma = Marshmallow()
