from config.dependencias import ma
from models.Modelos import Contacto
from schemas.localidad_schema import LocalidadSchema

class ContactoSchema(ma.SQLAlchemyAutoSchema):
    localidad = ma.Nested(LocalidadSchema)

    class Meta:
        model = Contacto
        load_instance = True

contacto_schema = ContactoSchema()
contactos_schema = ContactoSchema(many=True)