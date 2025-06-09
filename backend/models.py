from typing import List
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import relationship
from db import Base
from pydantic import BaseModel
    
restaurant_category = Table(
    'restaurant_category',
    Base.metadata,
    Column('restaurant_id', ForeignKey('restaurants.id'), primary_key=True),
    Column('category_id', ForeignKey('categories.id'), primary_key=True)
)

recipe_category = Table(
    'recipe_category',
    Base.metadata,
    Column('recipe_id', ForeignKey('recipes.id'), primary_key=True),
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
    
    recipes = relationship(
        "Recipe",
        secondary=recipe_category,
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
    
class RestaurantUpdate(BaseModel):
    id: int
    name: str
    categories: List[CategoryCreate]
    price: int
    description: str
    location: str
    rating: int
    visited: bool
    
class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), nullable=False)
    name = Column(String, nullable=False)

    recipe = relationship("Recipe", back_populates="ingredients")

class IngredientCreate(BaseModel):
    name: str
    
class Step(Base):
    __tablename__ = "steps"

    id = Column(Integer, primary_key=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)

    recipe = relationship("Recipe", back_populates="steps")

class StepCreate(BaseModel):
    step_number: int
    instruction: str
    
    
class Recipe(Base):
    __tablename__ = 'recipes'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    prep_time = Column(Integer, nullable=False)
    
    calories = Column(Integer, nullable=False)
    protein = Column(Integer, nullable=False)
    fiber = Column(Integer, nullable=False)

    categories = relationship("Category", secondary=recipe_category, back_populates="recipes")
    ingredients = relationship("Ingredient", back_populates="recipe", cascade="all, delete-orphan")
    steps = relationship("Step", back_populates="recipe", cascade="all, delete-orphan", order_by="Step.step_number")
    
class RecipeCreate(BaseModel):
    name: str
    prep_time: int
    
    calories: int
    protein: int
    fiber: int
    
    categories: List[CategoryCreate]
    ingredients: List[IngredientCreate]
    steps: List[StepCreate]
    
class RecipeUpdate(BaseModel):
    id: int
    name: str
    prep_time: int
    
    calories: int
    protein: int
    fiber: int
    
    categories: List[CategoryCreate]
    ingredients: List[IngredientCreate]
    steps: List[StepCreate]