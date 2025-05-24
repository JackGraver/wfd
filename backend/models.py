from sqlalchemy import Boolean, Column, Integer, String
from db import Base
from pydantic import BaseModel

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    price = Column(Integer)
    description = Column(String)
    location = Column(String)
    rating = Column(Integer)
    visited = Column(Boolean)
    
class RestaurantCreate(BaseModel):
    name: str
    category: str
    price: int
    description: str
    location: str
    rating: int
    visited: bool