from typing import List
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from db import Base
from pydantic import BaseModel
    
restaurant_category = Table(
    'restaurant_category',
    Base.metadata,
    Column('restaurant_id', ForeignKey('restaurants.id'), primary_key=True),
    Column('category_id', ForeignKey('categories.id'), primary_key=True)
)

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    
    restaurants = relationship(
        "Restaurant",
        secondary=restaurant_category,
        back_populates="categories"
    )

class CategoryCreate(BaseModel):
    id: int
    name: str
    
class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer)
    description = Column(String)
    location = Column(String)
    rating = Column(Integer)
    visited = Column(Boolean)
    
    categories = relationship(
        "Category",
        secondary=restaurant_category,
        back_populates="restaurants"
    )

class RestaurantCreate(BaseModel):
    name: str
    categories: List[CategoryCreate]
    price: int
    description: str
    location: str
    rating: int
    visited: bool