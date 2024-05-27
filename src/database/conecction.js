import { MongoClient } from "mongodb";
import jsonfile from 'jsonfile';

const MONGO_URL = "mongodb://localhost:27017/tif"

export const getConnectionUsers = async () => {
    try {
        const client = await MongoClient.connect(MONGO_URL)
        const collectionUsers = client.db().collection("users")
        return collectionUsers
    } catch(error){
        console.log(error)
    }
}

const readJSON = (filePath) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo JSON en ${filePath}:`, err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getCorralones = () => readJSON('src/database/data/corralones.json');
