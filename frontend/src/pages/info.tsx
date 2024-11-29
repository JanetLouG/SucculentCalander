import { useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import { Plant } from '../../../common/types/shared'; 
import { Button } from "@blueprintjs/core"
import { useNavigate } from 'react-router-dom';
import Rose from '../../../imagesStore/rose.jfif';
import cactus from '../../../imagesStore/cactus.jpg';
import Rhipsalidopsis from '../../../imagesStore/Rhipsalidopsis.jfif';


const InfoPage = () => {
  const location = useLocation();
  const data = location.state;
  const selectedId = data.id || "Rose";
  const [plant, setPlant] = useState<Plant>();
  const navigate = useNavigate();
  let imageSrc = "";
  if( selectedId === "Cactus")
  {
     console.log("image be set to " + cactus)
     imageSrc = cactus;
  }
  else if(selectedId === "Rhipsalidopsis" )
  {
    imageSrc = Rhipsalidopsis;
  }
  else if(selectedId === "Rose" )
  {
    imageSrc = Rose;
  }


  const handleBackGarden = () => {
    console.log('Button back to Garden clicked!');
    navigate('/');
  };
  
  
  console.log("selected: " + selectedId);
  useEffect(() => {
    const fetchData = async () => {
      
    console.log('fetchData at ' + selectedId );
    fetch(`http://localhost:8080/MyPlants/${selectedId}`,
          {method: "GET",
          headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
         )
         .then((res)=>res.json())
         .then((response) => {
          setPlant(response);
         })
         .catch((error) => console.log(error));
        }
   fetchData();
  }, [selectedId]);
  console.log("selected: done " + plant?.name);
  

  // if( plant?.name === "Rose")
  //   imageSrc = "Rose"
       
  console.log("image is " + imageSrc);
  return (
    <div className="info-page">
      {plant && (
        <center>
          <h1>The detail of {plant.name}!</h1>
          <div>
            <div className="PlantImage">
                <img src={imageSrc} width="100" height="100" />
            </div>
            <h3>Name: {plant.name}</h3> 
            <h3>amount: {plant.amount}</h3> 
            <p>Detail: {plant.detail}</p> 
            <th>
               <Button intent="primary" onClick={() => handleBackGarden()}>Home</Button>
            </th>         
          </div>
        </center>
      )}
      
    </div>
  );
};
// test
export default InfoPage;