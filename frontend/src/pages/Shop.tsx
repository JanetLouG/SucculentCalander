//import { useState } from "react";
//
// const Counter = () => {
//     const [count, setCount] = useState(0);

//     return (
//         <>
//             <div className='card'>
//                 <button onClick={() => setCount((count) => count + 1)}>
//                     count is {count}
//                 </button>
//             </div>
//         </>
//     );
// };

// export default Counter;
import React, { useState, useEffect } from 'react';
import { Plant } from '../../../common/types/shared';

const getPlants = (): Promise<Plant[]> => {
    return fetch('http://localhost:8080/MyPlants').then((res) => res.json());
  };

function ShoppingOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [plant, setPlant] = useState();
   const [plants, setPlants] = useState<Plant[]>([]);
//     {name: "lily", amount: 10, price: 5, watering: "daily", detail: "N/A"},   
//     {name: "rose", amount: 20, price: 6, watering: "weekly", detail: "N/A"},
//     {name: "cactus", amount: 30, price: 3, watering: "monthly", detail: "N/A"},
//   ]);

   useEffect(() => {
    console.log("Loading plants...");

    /** Call getWeather and update state accordingly */
    getPlants().then((data) => {
        console.log(data);
        setPlants(data);
        })
    }, []);

  const handleAddToCart = (plant: Plant) => {
    if(plant.amount <= 0)
    {
        console.log('current No such item available!, please select other one');
    }
    else
    {
        console.log("handleAddToCart " + plant.name); 
        setCartItems([...cartItems, plant]);
        const newAmount = plant.amount - 1;
        fetch("http://localhost:8080/MyPlants/", {
            method: "POST",
            body: JSON.stringify({
              name: plant.name,
              amount: newAmount,
              price: plant.price,
              watering: plant.watering,
              detail:  "N/A"
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then(response => response.json())
    }

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
          price: seletedPlant.price,
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
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Shopping Order Page</h2>

      <h3>plants</h3>
      <ul>
        {plants.map(plant => (
          <li key={plant.name}>
            {plant.name}: price-${plant.price}  { }           
            <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h3>Cart</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.name}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>Total: ${calculateTotal()}</p>

      <button disabled={cartItems.length === 0}>Checkout</button>
    </div>
  );
}

export default ShoppingOrder;