from models.Modelos import Localidad
from config.dependencias import db
from sqlalchemy import select

def obtener_todos_service():
    # Creo la consulta
    consulta = select(Localidad)

    # Ejecucion de la consulta
    resultado = db.session.execute(consulta)

    # Se entrega los registrs como objetos 
    return resultado.scalars().all()

def crear_localidad_service(localidad):

    # Guardado de nueva localidad
    db.session.add(localidad)
    db.session.commit()

    return localidad
