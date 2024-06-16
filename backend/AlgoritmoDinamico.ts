import Cardapio from "./types/Cardapio";
import { Prato } from "./types/Prato";

/**
 * Classe AlgoritmoDinamico responsável por calcular o melhor cardápio.
 */
export default class AlgoritmoDinamico {
  /**
   * Calcular o melhor cardápio com base no cardápio fornecido.
   * 
   * @param {Cardapio} cardapio - O objeto cardápio contendo dias, orçamento e pratos.
   * @returns {Object} Um objeto com o lucro máximo e a sequência de pratos.
   */
  calcularCardapio(cardapio: Cardapio) {
    let { dias, orcamento, pratos } = cardapio;
    let tabela: number[][] = new Array(dias + 1).fill(0).map(() => new Array(orcamento + 1).fill(0));
    let escolhas: number[][] = new Array(dias + 1).fill(0).map(() => new Array(orcamento + 1).fill(-1));
    let repeticoes: number[][][] = new Array(dias + 1).fill(0).map(() => new Array(orcamento + 1).fill(0).map(() => new Array(pratos.length).fill(0)));

    /**
     * Iterar por cada dia e cada possível orçamento.
     */
    for (let i = 1; i <= dias; i++) {
      for (let j = 1; j <= orcamento; j++) {
        let melhorLucro = -Infinity;
        let melhorPratoIndex = -1;

        for (let k = 0; k < pratos.length; k++) {
          let prato = pratos[k];
          if (prato.custo <= j) {
            let lucroAtual = prato.lucro;
            let penalidade = 1.0;

            // Penalidade de lucro para repetição de pratos
            if (i > 1 && escolhas[i - 1][j - prato.custo] === k) {
              penalidade = 0.5;
              if (i > 2 && escolhas[i - 2][j - prato.custo] === k) {
                penalidade = 0.0;
              }
            }

            lucroAtual *= penalidade;
            lucroAtual += tabela[i - 1][j - prato.custo];

            if (lucroAtual > melhorLucro || 
                (lucroAtual === melhorLucro && (melhorPratoIndex === -1 || prato.custo < pratos[melhorPratoIndex].custo))) {
              melhorLucro = lucroAtual;
              melhorPratoIndex = k;
            }
          }
        }

        if (melhorPratoIndex !== -1) {
          tabela[i][j] = melhorLucro;
          escolhas[i][j] = melhorPratoIndex;
          repeticoes[i][j][melhorPratoIndex] = (i > 1 && escolhas[i - 1][j - pratos[melhorPratoIndex].custo] === melhorPratoIndex) ? repeticoes[i - 1][j - pratos[melhorPratoIndex].custo][melhorPratoIndex] + 1 : 1;
        } else {
          tabela[i][j] = tabela[i - 1][j];
        }
      }
    }

    // Reconstruir a sequência de pratos escolhidos
    let sequenciaIndexPratos: number[] = [];
    let j = orcamento;
    for (let i = dias; i > 0; i--) {
      if (escolhas[i][j] !== -1) {
        sequenciaIndexPratos.push(escolhas[i][j] + 1); // Indice 1-based
        j -= pratos[escolhas[i][j]].custo;
      }
    }
    sequenciaIndexPratos.reverse();

    return {
      lucro: tabela[dias][orcamento].toFixed(1),
      sequencia: sequenciaIndexPratos
    };
  }

  /**
   * Verificar se o cardápio é válido.
   * 
   * @param {Cardapio} cardapio - O objeto cardápio a ser verificado.
   * @returns {string | null} Uma mensagem de erro se o cardápio for inválido, ou null se for válido.
   */
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