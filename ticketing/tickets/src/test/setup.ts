import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
  var mongo: any;
  var getMongoId: () => string;
}

//let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  // this no longer works:
  //mongo = new MongoMemoryServer();
  //const mongoUri = await mongo.getUri();

  //const mongo = await MongoMemoryServer.create();
  global.mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions).then(() => console.log('Connected to MongoDB.'));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  //await mongo?.stop();
  await global.mongo.stop();
  await mongoose.connection.close();
}, 20000);

global.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: global.getMongoId(),
    email: 'test@test.com'
  };

  // Create a JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT}
  const session = { jwt: token};

  // Turn that session into JSON.
  const sessionJson = JSON.stringify(session);

  //Take JSON and encode it as base64.
  const base64 = Buffer.from(sessionJson).toString('base64');

  // Return a string thats the cookie with the encoded data.
  return [`express:sess=${base64}`];
};

global.getMongoId = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  return id;
}