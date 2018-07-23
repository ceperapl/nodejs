import { MongoClient } from 'mongodb';
import { equal } from 'assert';
import cities from './cities';
import users from './users';
import products from './products';
import reviews from './reviews';

async function insertDocuments(db, collectName, collectData) {
  try {
    // Get the documents collection
    const collection = db.collection(collectName);
    // Insert some documents
    const result = await collection.insertMany(collectData);
    const docsCount = collectData.length;
    equal(docsCount, result.result.n);
    equal(docsCount, result.ops.length);
    console.log(`Inserted ${docsCount} documents into the collection ${collectName}`);
  } catch (error) {
    throw (error);
  }
}

async function initDatabase(url, dbName) {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);

    insertDocuments(db, 'cities', cities);
    insertDocuments(db, 'users', users);
    insertDocuments(db, 'products', products);
    insertDocuments(db, 'reviews', reviews);

    client.close();
  } catch (error) {
    console.error(error);
  }
}

initDatabase('mongodb://localhost:27017', 'mydb');
