import {Prato} from "../AlgoritmoGuloso";

export default interface Cardapio {
    dias: number,
    orcamento: number,
    pratos: Prato[]
}