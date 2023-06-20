<template>
  <div class="container">
    <h1 class="mt-5">Busca de Obras de Arte</h1>
  
    <div class="mt-5">
      <div class="row">
        <div class="col-md-4">
          <h2>Buscar por Artista:</h2>
          <div class="form-group">
            <label for="artist">Artista:</label>
            <input type="text" id="artist" class="form-control" v-model="searchArtist">
            <button class="btn btn-primary mt-2" @click="searchByArtist">Buscar</button>
          </div>
        </div>
  
        <div class="col-md-4">
          <h2>Buscar por Localização:</h2>
          <div class="form-group">
            <label for="location">Localização:</label>
            <input type="text" id="location" class="form-control" v-model="searchLocation">
            <button class="btn btn-primary mt-2" @click="searchByLocation">Buscar</button>
          </div>
        </div>
  
        <div class="col-md-4">
          <h2>Buscar por Título:</h2>
          <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" class="form-control" v-model="searchTitle">
            <button class="btn btn-primary mt-2" @click="searchByTitle">Buscar</button>
          </div>
        </div>
      </div>
    </div>
  
    <h2 class="mt-5">Resultados da Busca:</h2>
    <div class="row mt-3">
      <div class="col-md-4" v-for="artwork in artworks" :key="artwork.objectID">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ artwork.title }}</h5>
            <p class="card-text"><strong>Artista:</strong> {{ artwork.artistDisplayName }}</p>
            <p class="card-text"><strong>Localização:</strong> {{ artwork.repository }}</p>
            <p class="card-text"><strong>Descrição:</strong> {{ artwork.objectName }}</p>
            <button class="btn btn-sm btn-primary" @click="showDetails(artwork.objectID)">Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

data(){

return {
  searchArtist: '',
  searchLocation: '',
  searchTitle: '',
  artworks: {},
  selectedArtwork: null,
};

},

methods:{
  searchByArtist() {
      // Fazer a chamada à API passando this.searchArtist como parâmetro de busca
      // Atualizar this.artworks com os resultados da busca
    },
    searchByLocation() {
      // Fazer a chamada à API passando this.searchLocation como parâmetro de busca
      // Atualizar this.artworks com os resultados da busca
    },
    searchByTitle() {
      // Fazer a chamada à API passando this.searchTitle como parâmetro de busca
      // Atualizar this.artworks com os resultados da busca
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
