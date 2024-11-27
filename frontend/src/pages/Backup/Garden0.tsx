import './Garden.css';
import { useEffect, useState  } from 'react';



const Garden = () => { 

  const [plants, setPlants] = useState([
    { name: "Rose", amount: 20,   watering_frequency: "Every day" },
    { name: "cactus", amount: 23, watering_frequency: "once a week" },
    { name: "Rhipsalidopsis gaertneri", amount: 25, watering_frequency: "every day" },
]);

   return (
    <center>
        <h1>Welcome to My Garden!</h1>
        <div className="Garden">
        <table>
                <tr>
                    <th>Plant Name</th>
                    <th>amount</th>
                    <th>Watering frequency</th>
                </tr>
                {plants.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.amount}</td>
                            <td>{val.watering_frequency}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    </center>
)};

export default Garden;
