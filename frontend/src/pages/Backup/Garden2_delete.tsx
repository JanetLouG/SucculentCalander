import './Garden.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useEffect, useState  } from 'react';
import { Button, Toaster, EditableText, Position } from "@blueprintjs/core"


const GardenToaster = Toaster.create({
  position: Position.TOP,
})

const Garden = () => { 
  const [myplants, setMyplants] = useState([]);
  const [plants, setPlants] = useState([
    { name: "Rose", amount: 22,   watering_frequency: "Every day" },
    { name: "cactus", amount: 23, watering_frequency: "once a week" },
    { name: "Rhipsalidopsis gaertneri", amount: 25, watering_frequency: "every day" },
  ]);

  useEffect(() => {
    fetch("https://google.com/MyPlants")
      .then((response) => response.json())
      .then((json) => setMyplants(json));
  }, []);

  const handleAdd = () => {
    // Handle button click event
    console.log('Button add clicked!');
  };
  const handleInfo = () => {
    // Handle button click event
    console.log('Button info clicked!');
  };

 const handleDelete1 = () => {
    // Handle button click event
    console.log('Button delete clicked!');
  };

    const handleDelete = (name: string) => {
        // Handle button click event
        //setPlants((values) => {values.filter((item) => item.name !== name);});
        setPlants(plants.filter((item) => item.name !== name));
        console.log('Button delete clicked!' + name);
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
                                <Button intent="danger" onClick={() => handleDelete(val.name )}>Delete</Button>
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
