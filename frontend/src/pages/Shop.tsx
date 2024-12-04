import React, { useState, useEffect } from 'react';
import { Plant } from '../../../common/types/shared';

const getPlants = (): Promise<Plant[]> => {
    return fetch('http://localhost:8080/MyPlants').then((res) => res.json());
  };

function ShoppingOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [plant, setPlant] = useState();
   const [plants, setPlants] = useState<Plant[]>([]);

   useEffect(() => {
    console.log("Loading plants...");

    getPlants().then((data) => {
        console.log(data);
        setPlants(data);
        })
    }, []);

  const handleAddToCart = (plant: Plant) => {
      console.log("handleAddToCart " + plant.name); 
      setCartItems([...cartItems, plant]);
      const newAmount = plant.amount + 1;
      fetch("http://localhost:8080/MyPlants/", {
          method: "POST",
          body: JSON.stringify({
            name: plant.name,
            amount: newAmount,
            type: plant.type,
            watering: plant.watering,
            detail:  "N/A"
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then(response => response.json())
  
   };

  const handleRemoveFromCart = (seletedPlant: Plant) => {
    console.log("handleRemoveFromCart " + seletedPlant.name); 
    const updatedCart = cartItems.filter(plant => plant.name !== seletedPlant.name);
    setCartItems(updatedCart);
    fetch("http://localhost:8080/MyPlants/", {
        method: "POST",
        body: JSON.stringify({
          name: seletedPlant.name,
          amount: seletedPlant.amount,
          type: seletedPlant.type,
          watering: seletedPlant.watering,
          detail:  "N/A" 
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(response => response.json())
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + 1, 0);
  };

  return (
    <div>
      <h2>Shop</h2>

      <h3>Plants:</h3>
      <ul>
        {plants.map(plant => (
          <li key={plant.name}>
            {plant.name} { }           
            <button onClick={() => handleAddToCart(plant)}>+</button>
          </li>
        ))}
      </ul>

      <h3>Cart</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.name}>
            {item.name}
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>Total: {calculateTotal()} plants</p>

      <button 
              disabled={cartItems.length === 0}>Checkout</button>
    </div>
  );
}

export default ShoppingOrder;