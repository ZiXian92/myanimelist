'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import { createStore } from 'redux';
import reducers from '../views/reducers.js';
import renderReactPage from './renderer';

const PORT = 80;

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('*', (req, res)=>{
  renderReactPage(req, res, ()=>{
    return Promise.resolve(createStore(reducers, {
      selectedAnime: '',
      animeList: {
        'code-geass': {
          title: 'Code Geass',
          description: 'An exiled prince gains the power of the Geass and sets out on a rebellion against the empire.'
        },
        'buddy-complex': {
          title: 'Buddy Complex',
          description: 'A school boy gets sent into the future where he becomes a pilot for the Free Pact Alliance.'
        }
      }
    }));
  })
});

app.listen(PORT, ()=>{
  console.log('Listening on port '+PORT);
});
