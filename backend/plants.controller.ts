import { Plant } from "../common/types/shared";
import { db } from "./firebase";


const PlantCollectionRef = db.collection("Succulents");

export const addPlant = async (name: string, plant: Plant) => {
    const plantRef = PlantCollectionRef.doc(name);
    console.log("add plant "+ name);
    return await plantRef.set(plant);
  };

export const getPlants = async () => {
    const snapshot = await PlantCollectionRef.get();
    const plants = snapshot.docs.map((doc) => doc.data());
    return plants;
  };

export const getPlant = async (name: string) => {

    console.log("getPlant for 12 " + name)
    const plantRef = PlantCollectionRef.doc(name);
    const snapshot = await plantRef.get();
    console.log("getPlant for 13 " + snapshot.exists)
    if (snapshot.exists) {
      console.log("getPlant for 14 " + name)
      const plant = snapshot.data() as Plant;
      console.log("entry exist " + plant.name)
      return plant;
    }
    return null;
  };
 
  export const updateAmount = async (name: string, amount: number) => {
    const plantRef = PlantCollectionRef.doc(name);
    return await plantRef.update({ amount});
  };
  
  export const deletePlant = async (name: string) => {
    console.log("remove " + name)
    const plantRef = PlantCollectionRef.doc(name);
    const snapshot = await plantRef.get();
    if (snapshot.exists) {
      const plant = snapshot.data();
      console.log("entry exist " + plant)
    }
    else
    {
      console.log("entry does not exist for " + name)
    }
    return await plantRef.delete();
  };

  export const findPlant = async( name: string) =>{
    console.log("find " + name)
    let exist = false;
    const plantRef = PlantCollectionRef.doc(name);  
    if (plantRef != null) 
    {
      console.log("find 2 " + name)
      const snapshot = await plantRef.get();
      if (snapshot.exists) {      
         console.log("find 3 " + name)
         exist = true;
      }
    }
    return exist;
         
  }
