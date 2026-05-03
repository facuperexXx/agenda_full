from config.dependencias import ma
from models.Modelos import Localidad

class LocalidadSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Localidad
        load_instance = True

localidad_schema = LocalidadSchema()
localidades_schema = LocalidadSchema(many=True)