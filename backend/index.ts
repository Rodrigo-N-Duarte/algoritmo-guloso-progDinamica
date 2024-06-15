import express from "express";
import * as path from "path";
import cors from "cors";
import AlgoritmoGuloso from "./AlgoritmoGuloso";
import AlgoritmoDinamico from "./AlgoritmoDinamico";
import Cardapio from "./types/Cardapio";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');

const algoritmoGuloso: AlgoritmoGuloso = new AlgoritmoGuloso();
const algoritmoDinamico: AlgoritmoDinamico = new AlgoritmoDinamico();

app.post('/algoritmo-guloso', (req: any, res: any) => {
  const body: Cardapio = req.body.body;

  const verifyBody: string | null = algoritmoGuloso.verificarBody(body);
  if (verifyBody) return res.status(400).send(verifyBody);

  return res.status(200).send(algoritmoGuloso.calcularCardapio(body));
});

app.post('/algoritmo-dinamico', (req: any, res: any) => {
  const body: Cardapio = req.body.body;

  const verifyBody: string | null = algoritmoGuloso.verificarBody(body);
  if (verifyBody) return res.status(400).send(verifyBody);

  return res.status(200).send(algoritmoDinamico.calcularCardapio(body));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
