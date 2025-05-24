from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db import get_db
from models import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (e.g., localhost:5173 for Vite)
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
    result = await db.execute(select(Restaurant))
    restaurants = result.scalars().all()
    return restaurants

@app.post("/restaurants")
async def create_restaurant(
    restaurant: RestaurantCreate,
    db: AsyncSession = Depends(get_db)
):
    new_restaurant = Restaurant(**restaurant.model_dump())
    db.add(new_restaurant)
    await db.commit()
    await db.refresh(new_restaurant)
    return new_restaurant

@app.post("/visited/{restaurant_id}")
async def set_restaurant_visited(
    restaurant_id: int,
    rating: int = Body(..., embed=True),  # Expecting: { "rating": 5 }
    db: AsyncSession = Depends(get_db)
):
    # Find the restaurant by ID
    result = await db.execute(select(Restaurant).where(Restaurant.id == restaurant_id))
    restaurant = result.scalars().first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Update visited and rating
    restaurant.visited = True
    restaurant.rating = rating

    await db.commit()
    await db.refresh(restaurant)

    return restaurant