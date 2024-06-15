import {Prato} from "./Prato";

export default interface Cardapio {
    dias: number,
    orcamento: number,
    pratos: Prato[]
}