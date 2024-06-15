import Cardapio from "./types/Cardapio";
import { Prato } from "./types/Prato";

export default class AlgoritmoDinamico {
  calcularCardapio(cardapio: Cardapio) {
    let { dias, orcamento, pratos } = cardapio;
    let tabela: number[][] = new Array(dias + 1).fill(0).map(() => new Array(orcamento + 1).fill(0));
    let sequenciaIndexPratos: number[] = [];

    for (let i = 1; i <= dias; i++) {
      for (let j = 1; j <= orcamento; j++) {
        let melhorPratoPossivel = this.descobrirMelhorPratoPossivel(pratos, j, null, null);
        if (melhorPratoPossivel) {
          let lucro = melhorPratoPossivel.lucro;
          let custo = melhorPratoPossivel.custo;
          if (j >= custo) {
            let lucroAnterior = tabela[i - 1][j - custo];
            if (lucro + lucroAnterior > tabela[i - 1][j]) {
              tabela[i][j] = lucro + lucroAnterior;
              sequenciaIndexPratos.push(pratos.indexOf(melhorPratoPossivel) + 1);
            } else {
              tabela[i][j] = tabela[i - 1][j];
            }
          } else {
            tabela[i][j] = tabela[i - 1][j];
          }
        } else {
          tabela[i][j] = 0;
        }
      }
    }

    return {
      lucro: tabela[dias][orcamento].toFixed(1),
      sequencia: sequenciaIndexPratos
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