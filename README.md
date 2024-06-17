OBS: Os arquivos referentes ao algoritmos gulosos e a programação dinâmica estão na pasta referente ao backend.

### 1. Como esse problema pode ser modelado para o paradigma guloso?
   O problema pode ser modelado para guloso ao elaborar um método para a melhor escolha do prato de uma forma local.
   Tendo em base o orçamento disponível naquele momento e o custo de cada prato, pode-se escolher o melhor prato possível com base no custo ou relação lucro/custo por exemplo, que resultará num resultado ótimo local mas não garante o ótimo global
### 2. Seu algoritmo guloso apresenta a solução  ótima? Por quê?
O algoritmo apresenta a solução ótima de forma local, buscando entre o array de pratos o melhor prato possível com maior diferença entre lucro e custo.
### 3. Como esse problema pode ser modelado para o paradigma de programação dinâmica? 
O algoritmo avalia todas as combinações de pratos possíveis durante a iteração por dias e orçamentos e considera as penalidades por repetição para descobrir qual prato maximiza o lucro. Os melhores lucros dos dias anteriores determinam as decisões.

O algoritmo retrocede a partir da matriz de escolhas, começando do último dia até o primeiro, para reconstruir a sequência de pratos escolhidos que gera o lucro máximo.
Por meio do armazenamento e reutilização dos resultados intermediários através das matrizes tabela e escolhas, esse método garante que o problema seja resolvido de forma eficiente.
### 4. Discuta a subestrutura  ótima e a sobreposição dos problemas.
- Usando Matrizes de Memória: Os resultados dos subproblemas são armazenados nas matrizes tabela e escolha no código fornecido. Isso permite acessar diretamente os resultados que foram calculados anteriormente, sem a necessidade de recalcular.
- Eficácia do Algoritmo: Mesmo para entradas maiores, como k até 21 e, o algoritmo dinâmico é eficiente ao evitar recálculos desnecessários.
até 50. A estratégia de armazenamento de soluções parciais e reutilização inteligente permite que isso aconteça.
### 5. Algum algoritmo clássico foi adaptado para resolver o problema? Se sim, qual foi ele?
Não, foi na pura queima de neurônios.


###
* Rodrigo Duarte
* Matheus Trindade
* Carlos Alberto Diniz
* Israel Alexsander
* Vinicius Resende
