import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from './controllers/getDecksController';
import { getDeckController } from './controllers/getDeckController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController';

const app = express();
const PORT = 5001;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController);

console.log(`why is ${process.env.MONGO_URL}`);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
