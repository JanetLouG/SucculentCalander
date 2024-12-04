import './Garden.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useEffect, useState  } from 'react';
import { Button,  InputGroup} from "@blueprintjs/core"
import { Plant } from '../../../common/types/shared';
import { useNavigate } from 'react-router-dom';



const getPlants = (): Promise<Plant[]> => {
  return fetch('http://localhost:8080/MyPlants').then((res) => res.json());
};

const plants =[
  {name: "Rose", amount: 10, watering: "weekly", 
    detail: "some 100 species of perennial shrubs in the rose family (Rosaceae). \
    Roses are native primarily to the temperate regions of the Northern Hemisphere. \
    Many roses are cultivated for their beautiful flowers, which range in colour \
     from white through various tones of yellow and pink to dark crimson and maroon,\
      and most have a delightful fragrance, which varies according to the variety and \
      to climatic conditions.  "
    },

    {name: "Lily", amount: 20, watering: "daily", 
      detail: "(genus Lilium), genus of 80 to 100 species of herbaceous flowering plants of the family Liliaceae, native to temperate areas of the Northern Hemisphere. Many lilies are prized as ornamental plants, and they have been extensively hybridized."},

]

const Garden = () => { 
  const [plants, setPlants] = useState<Plant[]>([{name: "Cactus", amount: 1, type: "cactus", watering: "monthly", detail: "N/A"}]);
  const [plant, setPlant] = useState({name: "lily", amount: 10, watering: "daily" });
  const [selectedId, setSelectedId] = useState({});
  const [newName, setNewName] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [newType, setNewType] = useState("")
  const [newWatering, setNewWatering] = useState("")
  const navigate = useNavigate();
  const [isInfo, setIsInfo] = useState(false);

  const dataToShare = { name: 'John', age: 30 };


  useEffect(() => {
    console.log("Loading plants...");

    getPlants().then((data) => {
        console.log(data);
        setPlants(data);
        })
    }, []);

  const handleAdd = () => {
    console.log('Button add clicked!');
    const newname = newName.trim()
    const newamount = Number(newAmount.trim())
    const newtype = newType.trim()
    const newwatering = newWatering.trim()


    if(newname && newamount && newwatering && newtype)
    {
      const plant = { name: newname, amount: newamount, type: newtype, watering: newwatering, detail: "N/A"}; 
      console.log('Button add clicked! 100');
      setPlants([...plants, plant])
      fetch("http://localhost:8080/MyPlants", {
        method: "POST",
        body: JSON.stringify({
          name: newname,
          amount: newamount,
          type: newtype,
          watering: newwatering,
          detail:  "N/A"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(response => response.json())
      .then(data => {
         setPlants([...plants, data])          
       });
    }
  
    // Handle button click event
    console.log('Button add clicked done!');
  };

  const handleInfo = (name: string) => {
    // Handle button click event
    const dataToShare = { id: name };
    console.log('Button info clicked!' + name);
  
    setIsInfo(true);
    setSelectedId(name);
    navigate('/info', { state: dataToShare });
   
    console.log('Button info clicked!  2 ' );
  };

    
  const handleDelete = async  (name: string) => {

      setPlants(plants => {
      return plants.filter(item => item.name !== name) });
      
      console.log('Button begin delete clicked!  1 ' + name);
      const response1 = await fetch("http://localhost:8080/MyPlants/name", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // Add any other necessary headers here, e.g. authorization
        },
        body: JSON.stringify({ id: name }) 
      })
      .then(response => response.json())
      .then(() => {
        setPlants(plants => {
          return plants.filter(item => item.name !== name)
        });
        console.log('Button begin delete clicked!  2 ' + response1);
      });
    }
   return (
        <>
        {!isInfo&&(
        <center>     
        <h1>Welcome to My Garden!</h1>
        <tr>
        <div className="Garden">
            <table>
                <tr>
                    <th>Plant Name</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Watering Frequency</th>
                    <th></th>
                </tr>
                   {plants.map((val, key) => {
                    return (
                        <tr key={key}>
                            <th>{val.name}</th>
                            <th>{val.amount}</th>
                            <th>{val.type}</th>
                            <th>{val.watering}</th>
                            <th>
                                <Button intent="primary" onClick={() => handleInfo(val.name)}>Info</Button>                               
                            </th>    
                                &nbsp;
                            <th>
                                <Button intent="danger" onClick={() => handleDelete(val.name )}>Delete</Button>
                            </th>
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
                         value={newType}
                         onChange={e => setNewType(e.target.value)}
                         placeholder="Add type..."
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
    )}
    </>
)};

export default Garden;
