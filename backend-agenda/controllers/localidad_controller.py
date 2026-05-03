from models.Respuesta import respuesta_schema, Respuesta
from services.localidad_service import *
from schemas.localidad_schema import localidad_schema, localidades_schema
from flask import jsonify, request

def obtener_todos():
    localidades = obtener_todos_service()

    # Verifica recoleccion de datos
    if not localidades:
        resp = Respuesta(False, [], message="No se obtuvieron datos", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404
    
    # Filtro superado - se crea respuesta con datos
    ok = True
    count = len(localidades)
    data = localidades_schema.dump(localidades)
    message = ""

    # Creacion de respuesta
    respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

    # Se envia respuesta serializada
    return jsonify(respuesta_schema.dump(respuesta))

def crear_localidad():
    try:
        # Verificacion de la estructura de datos
        localidad = localidad_schema.load(request.json)

        # Envio de datos para guardar
        nueva_localidad = crear_localidad_service(localidad)

        # Creacion de la respuesta
        ok = True
        data = [localidad_schema.dump(nueva_localidad)]
        count = len(data)
        message = ""

        respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

        return jsonify(respuesta_schema.dump(respuesta))

    except:
        resp = Respuesta(False, [], message="No se creo el registro Localidad", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404
