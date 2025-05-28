import type { Restaurant } from "../types/Restaurant";

export async function addRestaurant(restaurant: Restaurant) {
    const response = await fetch("http://192.168.4.64:8000/restaurants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to add restaurant: ${error}`);
    }

    return await response.json();
}

export async function updateRestaurant(restaurant: Restaurant) {
    const response = await fetch(`http://192.168.4.64:8000/restaurants`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurant),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update restaurant: ${error}`);
    }

    return await response.json();
}

export async function deleteRestaurant(restaurant: number) {
    const response = await fetch(
        `http://192.168.4.64:8000/restaurants/${restaurant}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to delete restaurant: ${error}`);
    }

    if (response.status === 204) return; // No content
    return await response.json();
}
