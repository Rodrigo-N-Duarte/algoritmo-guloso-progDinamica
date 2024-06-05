import Cardapio from "./types/Cardapio";
import {Prato} from "./types/Prato";

export default class AlgoritmoGuloso {
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

    descobrirMelhorPratoPossivel(pratos: Prato[], orcamento: number, pratoAnterior: Prato | null, pratoDoisAnterior: Prato | null) {
        let melhorPrato = null;
        let melhorDiferenca: number = -Infinity;

        for (const prato of pratos) {
            if (prato.custo <= orcamento) {
                let diferenca: number = (prato.lucro - prato.custo);
                if (prato == pratoAnterior) diferenca = (prato.lucro * 0.5) - prato.custo
                if (prato == pratoDoisAnterior) diferenca = 0
                if (diferenca > melhorDiferenca) {
                    melhorDiferenca = diferenca;
                    melhorPrato = prato;
                }
            }
        }
        return melhorPrato;
    }

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