import { useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';
import { Plant } from '../../../common/types/shared'; 
import { Button } from "@blueprintjs/core"
import { useNavigate } from 'react-router-dom';

//Images
import Aloe from '../../../imagesStore/Aloe.png';
import Cactus from '../../../imagesStore/Cactus.jpg';
import Crassula from '../../../imagesStore/Crassula.jpg';
import Echeveria from '../../../imagesStore/Echeveria.jpg';
import Haworthia from '../../../imagesStore/Haworthia.jpg';
import Lithops from '../../../imagesStore/Lithops.png';
import noImage from '../../../imagesStore/noImage.jpg';


const InfoPage = () => {
  const location = useLocation();
  const data = location.state;
  const selectedId = data.id || "Rose";
  const [plant, setPlant] = useState<Plant>();
  const navigate = useNavigate();
  let imageSrc = "";
  if( selectedId === "Aloe")
  {
     console.log("image set to " + Aloe)
     imageSrc = Aloe;
  }
  else if( selectedId === "Cactus")
    {
       console.log("image set to " + Cactus)
       imageSrc = Cactus;
    }
  else if(selectedId === "Crassula" )
  {
    imageSrc = Crassula;
  }
  else if(selectedId === "Echeveria" )
  {
    imageSrc = Echeveria;
  }
  else if(selectedId === "Haworthia" )
  {
    imageSrc = Haworthia;
  }
  else if(selectedId === "Lithops" )
  {
    imageSrc = Lithops;
  }
  else
  {
    imageSrc = noImage;
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
  

  console.log("image is " + imageSrc);
  return (
    <div className="info-page">
      {plant && (
        <center>
          <h1>{plant.name}</h1>
          <div>
            <div className="PlantImage">
                <img src={imageSrc} width="100" height="100" />
            </div>
            <h3>Watering: {plant.watering}</h3> 
            <p>Details: {plant.detail}</p> 
          </div>
        </center>
      )}
      
    </div>
  );
};

export default InfoPage;