from typing import List
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase): 
    pass

class Contacto(Base):
    __tablename__ = "contactos"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(40))
    apellido: Mapped[str] = mapped_column(String(35))
    mail: Mapped[str] = mapped_column(String(50))
    telefono: Mapped[int] = mapped_column(Integer)
    localidad_id: Mapped[int] = mapped_column(ForeignKey("localidades.id"))

    localidad: Mapped["Localidad"] = relationship(back_populates="personas")

class Localidad(Base):
    __tablename__ = "localidades"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(35))
    provincia: Mapped[str] = mapped_column(String(40))

    personas: Mapped[List["Contacto"]] = relationship(back_populates="localidad")