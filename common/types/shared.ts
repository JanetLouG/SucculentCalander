export interface Plant {    
    amount: number;
    detail: string;
    name: string;
    price:  number,
    watering: string;
}

        // const response = await fetch(`https://localhost:8080/MyPlants/${name}`, {
        //   method: "DELETE",
        // })
        // if( !response.ok)
        // {
        //   throw new Error('Failed to delete item');
        // }