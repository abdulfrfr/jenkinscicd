const MongoClient = require('mongodb').MongoClient;

// Connection URL for MongoDB (make sure your local MongoDB is running)
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Data to insert into the collection
const dataToInsert = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 36 },
];

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Create a collection
    const collection = db.collection('mycollection');

    // Insert data into the collection
    const result = await collection.insertMany(dataToInsert);

    console.log(`${result.insertedCount} documents inserted.`);

    const insertedDocuments = await collection.find({}).toArray();

    console.log('Inserted documents:');
    console.log(insertedDocuments);
  } finally {
    // Close the client
    client.close();
  }
}

run().catch(console.error);
