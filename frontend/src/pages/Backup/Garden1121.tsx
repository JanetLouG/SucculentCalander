import './Garden.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useEffect, useState  } from 'react';
import { Button, Toaster, InputGroup, EditableText, Position } from "@blueprintjs/core"
import { Plant } from '../../../common/types/shared';


const GardenToaster = Toaster.create({
  position: Position.TOP,
})

const getPlants = (): Promise<Plant[]> => {
  return fetch('http://localhost:8080/MyPlants').then((res) => res.json());
};

const Garden = () => { 
  const [plants, setPlants] = useState<Plant[]>([{name: "lily", amount: 10, watering: "daily" }]);
  const [myplants, setMyplants] = useState([]);
  const [newName, setNewName] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [newWatering, setNewWatering] = useState("")

  // const [plants, setPlants] = useState([
  //   { name: "Rose", amount: 22,   watering_frequency: "Every day" },
  //   { name: "cactus", amount: 23, watering_frequency: "once a week" },
  //   { name: "Rhipsalidopsis gaertneri", amount: 25, watering_frequency: "every day" },
  // ]);

  useEffect(() => {
    console.log("Loading plants...");

    /** Call getWeather and update state accordingly */
    getPlants().then((data) => {
        console.log(data);
        setPlants(data);
        })
    }, []);

  // this should be final version base
  // const handleAddPlant = () => {
  //   const name1 = newName.trim();
  //   const amount1 = Number(newAmount.trim());
  //   const Watering1 = newWatering.trim();
  //   if (name1 && amount1 && Watering1) {
  //     fetch("https://mydatabase_site/plants", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name1,
  //         amount1,
  //         Watering1,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setPlants([...plants, data]);
  //         setNewName("");
  //         setNewAmount("");
  //         setNewWatering("");
  //         GardenToaster.show({
  //           message: "Plant added successfully",
  //           intent: "success",
  //           timeout: 3000,
  //         });
  //       });
  //   }
  // }

  // const handleupdate = (name: string) => {
  //   const plant = plants.find((plant) => plant.name === name);

  //   fetch(`https://mydatabase_site/users/${name}`, {
  //     method: "PUT",
  //     body: JSON.stringify(name),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       GardenToaster.show({
  //         message: "Plant updated successfully",
  //         intent: "success",
  //         timeout: 3000,
  //       });
  //     });
  // };

  const handleAdd = () => {
    console.log('Button add clicked!');
    const newname = newName.trim()
    const newamount = Number(newAmount.trim())
    const newwatering = newWatering.trim()

    if(newname && newamount && newwatering)
    {
      const plant = { name: newname, amount: newamount, watering: newwatering}; 
      console.log('Button add clicked! 100');
      //setPlants([...plants, plant])
      fetch("http://localhost:8080/MyPlants", {
        method: "POST",
        body: JSON.stringify({
          name: newname,
          amount: newamount,
          watering: newwatering,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
       //.then(response => response.json())
       .then(response => {
           console.log('Button add clicked! 200');
           if( response.status == 200)
           {
             console.log( "add plant { name: " + plant.name + " amount: " + plant.amount + "  watering: " + plant.watering);
             setPlants([...plants, plant]); 
           }
           else
           {
             console.log( "add plant failure for " + plant.name + " response.status = " + response.status);
           }
       })
    }
  
    // Handle button click event
    console.log('Button add clicked done!');
  };
  const handleInfo = () => {
    // Handle button click event
    console.log('Button info clicked!');
  };
    
  const handleDelete = async  (name: string) => {
      
      console.log('Button begin delete clicked!  1 ' + name);
      const response1 = await fetch("http://localhost:8080/MyPlants/${name}", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Add any other necessary headers here, e.g. authorization
        },
        body: JSON.stringify({ id: name }) 
      })
      //.then(response => response.json())
      .then(response => {
        console.log(response.status);
        if (!response.ok) {
          throw new Error(' response was not ok ' + response);
        }
      })
      .then(() => {
        setPlants(values => {
          return values.filter(item => item.name !== name)
        });
      // .catch((error: any) => {
      //   console.error( error);
      //   return 0;
      // }); 
      console.log('Button begin delete clicked!  2 ' + response1);
   
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
                            <td>{val.watering}</td>
                            <td>
                                <Button intent="primary" onClick={handleInfo}>Info</Button>
                                &nbsp;
                                <Button intent="danger" onClick={() => handleDelete(val.name )}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td>
                      <InputGroup
                         value={newName}
                         onChange={e => setNewName(e.target.value)}
                         placeholder="Add name here..."
                      />
                    </td>
                    <td>
                      <InputGroup
                         value={newAmount}
                         onChange={e => setNewAmount(e.target.value)}
                         placeholder="Add amount..."
                      />
                    </td>
                    <td>
                      <InputGroup
                         value={newWatering}
                         onChange={e => setNewWatering(e.target.value)}
                         placeholder="Add amount..."
                      />
                    </td>
                    <td>
                       <Button intent="success" onClick={handleAdd}>
                          Add new plant
                       </Button>
                    </td>
                </tr>

            </table>
        </div>
        </tr>
    </center>
)};

export default Garden;
