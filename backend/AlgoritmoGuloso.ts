import {Prato} from "./types/Prato";
import Cardapio from "./types/Cardapio";

export default class AlgoritmoGuloso {
    /*
    Recebe um cardápio, com os dias, orçamento total e uma lista de pratos possíveis
    Para cada dia faz uma análise do melhor prato possível para ser vendido e guarda em variáveis, pratos anteriores
    Se não tiver nenhum prato disponível, retorna 0
    * */
    calcularCardapio(cardapio: Cardapio) {
        let {dias, orcamento, pratos} = cardapio;
        let pratoAnterior: Prato | null = null, pratoDoisAnterior: Prato | null = null;
        let lucroFinal: number = 0;
        let sequenciaIndexPratos: number[] = [];

        for (let i = 0; i < dias; i++) {
            const melhorPratoPossivel = this.descobrirMelhorPratoPossivel(pratos, orcamento, pratoAnterior, pratoDoisAnterior);
            if (melhorPratoPossivel) {
                orcamento -= melhorPratoPossivel.custo;
                lucroFinal += melhorPratoPossivel.lucro;

                sequenciaIndexPratos.push(pratos.indexOf(melhorPratoPossivel) + 1);

                pratoDoisAnterior = pratoAnterior;
                pratoAnterior = melhorPratoPossivel;
            } else {
                lucroFinal = 0;
                break;
            }
        }

        return {
            lucro: lucroFinal.toFixed(1),
            sequencia: lucroFinal == 0 ? [] : sequenciaIndexPratos
        };
    }

    /*
    Método para descobrir o melhor prato possivel dentro a lista de pratos que caiba dentro do orçamento da vez
    Uma repetição que percorre todo o array de pratos e memoriza a maior diferença entre lucro e custo dos pratos
    A relação lucro/custo do prato pode mudar se o prato anterior ou de dois dias antes for igual
    O método escolhe o melhor prato do momento, não calcula lucros futuros
    No final retorna o prato possível com maior valor agregado
    * */
    descobrirMelhorPratoPossivel(pratos: Prato[], orcamento: number, pratoAnterior: Prato | null, pratoDoisAnterior: Prato | null) {
        let melhorPrato = null;
        let melhorDiferenca: number = -Infinity;

        for (const prato of pratos) {
            if (prato.custo <= orcamento) {
                let diferenca: number = (prato.lucro - prato.custo);
                if (prato == pratoAnterior) diferenca = (prato.lucro * 0.5) - prato.custo
                if (prato == pratoAnterior && prato == pratoDoisAnterior) diferenca = 0
                if (diferenca > melhorDiferenca) {
                    melhorDiferenca = diferenca;
                    melhorPrato = prato;
                }
            }
        }
        return melhorPrato;
    }

    /*
    Método usado apenas para chegar os dados do body da requisição
    * */
    verificarBody(cardapio: Cardapio): string | null {
        if (!cardapio.dias || cardapio.dias < 1 || cardapio.dias > 21) {
            return "Quantidade de dias inválida";
        }
        if (!cardapio.pratos || cardapio.pratos.length < 1 || cardapio.pratos.length > 50) {
            return "Quantidade de pratos inválida";
        }
        if (cardapio.orcamento < 0 || cardapio.orcamento > 100) {
            return "Orçamento inválido";
        }
        return null;
    }
}