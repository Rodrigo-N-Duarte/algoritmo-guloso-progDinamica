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
    const { dias, orcamento, pratos } = cardapio;
    const tabela = Array.from({ length: dias + 1 }, () => Array(orcamento + 1).fill(0));
    const escolhas = Array.from({ length: dias + 1 }, () => Array(orcamento + 1).fill(-1));

    for (let i = 1; i <= dias; i++) {
      for (let j = 1; j <= orcamento; j++) {
        for (let k = 0; k < pratos.length; k++) {
          const prato = pratos[k];
          if (prato.custo <= j) {
            let lucroAtual = prato.lucro;
            if (i > 1 && escolhas[i - 1][j - prato.custo] === k) {
              lucroAtual *= 0.5;
              if (i > 2 && escolhas[i - 2][j - prato.custo] === k) {
                lucroAtual = 0;
              }
            }
            lucroAtual += tabela[i - 1][j - prato.custo];

            if (lucroAtual > tabela[i][j]) {
              tabela[i][j] = lucroAtual;
              escolhas[i][j] = k;
            }
          }
        }
      }
    }

    // Reconstruir a sequência de pratos escolhidos
    const sequenciaIndexPratos: number[] = [];
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
    if (cardapio.dias < 1 || cardapio.dias > 21) {
      return "Quantidade de dias inválida";
    }
    if (cardapio.pratos.length < 1 || cardapio.pratos.length > 50) {
      return "Quantidade de pratos inválida";
    }
    if (cardapio.orcamento < 0 || cardapio.orcamento > 100) {
      return "Orçamento inválido";
    }
    return null;
  }
}
