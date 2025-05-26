from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from db import get_db
from models import *
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.4.64:5173", "http://192.168.4.72:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}

@app.get("/restaurants")
async def get_restaurants(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Restaurant).options(selectinload(Restaurant.categories))
    )
    restaurants = result.scalars().all()

    return restaurants

@app.get("/categories")
async def get_restaurants_and_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category))
    categories = result.scalars().all()

    return categories

@app.post("/restaurants")
async def create_restaurant(
    restaurant: RestaurantCreate,
    db: AsyncSession = Depends(get_db)
):
    new_restaurant = Restaurant(
        name=restaurant.name,
        description=restaurant.description,
        price=restaurant.price,
        location=restaurant.location,
        rating=restaurant.rating,
        visited=restaurant.visited,
    )

    all_categories: List[Category] = []

    if restaurant.categories:
        existing_ids = [c.id for c in restaurant.categories if c.id != -1]
        new_names = [c.name for c in restaurant.categories if c.id == -1]

        if existing_ids:
            result = await db.execute(select(Category).where(Category.id.in_(existing_ids)))
            all_categories.extend(result.scalars().all())

        for name in new_names:
            print('HEREEEEEEEEEEEEEE', name)
            new_cat = Category(name=name)
            db.add(new_cat)
            await db.flush() 
            all_categories.append(new_cat)

        new_restaurant.categories = all_categories

    db.add(new_restaurant)
    await db.commit()
    await db.refresh(new_restaurant)

    return new_restaurant

@app.post("/visited/{restaurant_id}")
async def set_restaurant_visited(
    restaurant_id: int,
    rating: int = Body(..., embed=True),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Restaurant).options(selectinload(Restaurant.categories)).where(Restaurant.id == restaurant_id))
    restaurant = result.scalars().first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    restaurant.visited = True
    restaurant.rating = rating

    await db.commit()
    await db.refresh(restaurant)

    return restaurant


@app.get("/recipes")
async def get_restaurants(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Recipe).options(selectinload(Recipe.categories))
    )
    recipes = result.scalars().all()

    return recipes


@app.get("/recipe/{recipe_id}")
async def get_recipe(recipe_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Recipe).where(Recipe.id == recipe_id).options(selectinload(Recipe.categories))
    )
    recipes = result.scalars().one()

    return recipes

@app.post("/recipes")
async def create_restaurant(
    recipe: RecipeCreate,
    db: AsyncSession = Depends(get_db)
):
    # all_categories: List[Category] = []

    # if restaurant.categories:
    #     existing_ids = [c.id for c in restaurant.categories if c.id != -1]
    #     new_names = [c.name for c in restaurant.categories if c.id == -1]

    #     if existing_ids:
    #         result = await db.execute(select(Category).where(Category.id.in_(existing_ids)))
    #         all_categories.extend(result.scalars().all())

    #     for name in new_names:
    #         print('HEREEEEEEEEEEEEEE', name)
    #         new_cat = Category(name=name)
    #         db.add(new_cat)
    #         await db.flush() 
    #         all_categories.append(new_cat)

    #     new_restaurant.categories = all_categories

    db.add(recipe)
    await db.commit()
    await db.refresh(recipe)

    return recipe