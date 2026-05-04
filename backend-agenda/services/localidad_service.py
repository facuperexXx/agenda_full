from models.Modelos import Localidad
from config.dependencias import db
from sqlalchemy import select, exists

def verificar_existencia_service(id:int):
    consulta = select(exists(Localidad).where(Localidad.id == id))
    existe = db.session.scalar(consulta)

    return existe

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

def buscar_por_id_service(id:int):
    consulta = select(Localidad).where(Localidad.id == id)

    # scalar_one_or_one -> trae un solo registro, lanza error si esta repetido
    resultado = db.session.execute(consulta).scalar_one_or_none()

    return resultado

def eliminar_localidad_service(id:int):
    # Se obtiene el registro indicado con id
    registro = buscar_por_id(id)

    # Elimacion de la localidad
    db.session.delete(registro)
    db.session.commit()

def modificar_localidad_service(datos:dict, id:int):
    localidad = buscar_por_id_service(id)

    for key, valor in datos.items():
        if hasattr(localidad, key):
            setattr(localidad, key, valor)

    db.session.commit()
    print("Cambios guardados")
    

