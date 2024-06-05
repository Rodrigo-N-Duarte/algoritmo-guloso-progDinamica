<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-container>
          <h2>Algoritmo Guloso</h2>
          <v-form>
            <span>Dias:</span>
            <v-text-field :rules="rules" v-model="diasGuloso" class="mb-2" type="number" placeholder="Nº dias"></v-text-field>
            <span>Orçamento inteiro:</span>
            <v-text-field :rules="rules" v-model="orcamentoGuloso" class="mb-2" type="number" placeholder="Orçamento"></v-text-field>
            <div>
              <div class="mb-5">
                <v-btn
                    color="success"
                    @click="() => pratosGuloso.push({custo: null, lucro: null})"
                >
                  + Prato
                </v-btn>
              </div>
              <div v-for="(prato, i) in pratosGuloso" :key="i">
                <v-row>
                  <v-col cols="5">
                    <span>Custo prato {{i + 1}}</span>
                    <v-text-field :rules="rules" class="mb-2" type="number" v-model="prato.custo"
                                  :placeholder="`Custo Prato ${i + 1}`"></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <span>Lucro prato {{i + 1}}</span>
                    <v-text-field :rules="rules" class="mb-2" type="number" v-model="prato.lucro"
                                  :placeholder="`Lucro Prato ${i + 1}`"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                        color="error"
                        @click="() => pratosGuloso.splice(pratosGuloso.indexOf(prato), 1)"
                    >
                      -
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div v-if="requisicao">
              <h2>Lucro total: {{respostaGuloso.lucro}}</h2>
              <h2>Sequência de pratos utilizada: {{respostaGuloso.sequencia.join(", ")}}</h2>
            </div>
            <v-btn variant="outlined" @click="() => algoritmoGuloso()">
              Algoritmo guloso
            </v-btn>
          </v-form>
        </v-container>
        <v-container>
        </v-container>
      </v-col>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>

</template>

<script>

import axios from "axios";

export default {
  name: 'App',
  components: {},
  data: () => {
    return {
      rules: [
        value => !!value || 'Obrigatório.',
      ],
      diasGuloso: null,
      orcamentoGuloso: null,
      pratosGuloso: [],
      requisicao: false,
      respostaGuloso: {
        lucro: null,
        sequencia: []
      }
    }
  },
  methods: {
    async algoritmoGuloso() {
      try {
        const body = {
          dias: +this.diasGuloso,
          orcamento: +this.orcamentoGuloso,
          pratos: this.pratosGuloso.map(prato => {
            return {custo: +prato.custo, lucro: +prato.lucro}
          })
        }
        const response = await axios.post("http://localhost:3000/algoritmo-guloso", {
          headers: {
            "Content-Type": "application/json"
          }, body})
        if (response.status === 200) {
          this.requisicao = true
          this.respostaGuloso = response.data
        }
      } catch (e) {
        alert(`Erro ao guloso ${e}`)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
