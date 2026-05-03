from marshmallow import Schema, fields, post_load

class Respuesta:
    def __init__(self, ok, data, message, count=None):
        self.ok = ok
        self.data = data
        self.message = message
        self.count = count

class RespuestaSchema(Schema):
    ok = fields.Boolean(required=True)
    data = fields.Raw(required=True)
    message = fields.Str(required=True)
    count = fields.Int(required=True)

    # El schema puede crear instancias de clase
    @post_load
    def make_respuesta(self, ok, data, message, count=None):
        return Respuesta(ok, data, message=message, count=count)

    class Meta:
        fields = ("ok", "data", "message", "count")
        ordered = True

# Instancia para usar
respuesta_schema = RespuestaSchema()

