import './Garden.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useEffect, useState  } from 'react';
import { Button, Toaster, EditableText, Position } from "@blueprintjs/core"




const Garden = () => { 

  const [plants, setPlants] = useState([
    { name: "Rose", amount: 20,   watering_frequency: "Every day" },
    { name: "cactus", amount: 23, watering_frequency: "once a week" },
    { name: "Rhipsalidopsis gaertneri", amount: 25, watering_frequency: "every day" },
  ]);

  const handleAdd = () => {
    // Handle button click event
    console.log('Button add clicked!');
  };
  const handleInfo = () => {
    // Handle button click event
    console.log('Button info clicked!');
  };

 const handleDelete = () => {
    // Handle button click event
    console.log('Button delete clicked!');
  };
   return (
    <center>
        <h1>Welcome to My Garden!</h1>
        <tr>
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
                            <td>
                                <Button intent="primary" onClick={handleInfo}>Info</Button>
                                &nbsp;
                                <Button intent="danger" onClick={handleDelete}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                   <th></th>
                   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                     <Button intent="primary" style={{width:100, marginLeft:150}} onClick={handleAdd}>Add</Button>
                  </div>
                  <th></th>
                </tr>

            </table>
        </div>
        </tr>
    </center>
)};

export default Garden;
