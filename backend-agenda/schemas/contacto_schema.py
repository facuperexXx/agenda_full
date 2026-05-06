from config.dependencias import ma
from models.Modelos import Contacto
from schemas.localidad_schema import LocalidadSchema

class ContactoSchema(ma.SQLAlchemyAutoSchema):
    localidad = ma.Nested(LocalidadSchema, dump_only=True)

    localidad_id = ma.auto_field(load_only=True)

    class Meta:
        model = Contacto
        load_instance = True
        include_fk = True

contacto_schema = ContactoSchema()
contactos_schema = ContactoSchema(many=True)