<template>
  <div class="container">
    <h1 class="mt-5">Busca de Obras de Arte</h1>

    <div class="mt-5">
      <div class="row">
        <div class="col-md-4">
          <h2>Buscar por Artista:</h2>
          <div class="form-group">
            <label for="artist">Artista:</label>
            <input
              type="text"
              id="artist"
              class="form-control"
              v-model="searchArtist"
            />
            <button class="btn btn-primary mt-2" @click="searchByArtist()">
              Buscar
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <h2>Buscar por Localização:</h2>
          <div class="form-group">
            <label for="location">Localização:</label>
            <input
              type="text"
              id="location"
              class="form-control"
              v-model="searchLocation"
            />
            <button class="btn btn-primary mt-2" @click="searchByLocation()">
              Buscar
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <h2>Buscar por Título:</h2>
          <div class="form-group">
            <label for="title">Título:</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="searchTitle"
            />
            <button class="btn btn-primary mt-2" @click="searchByTitle()">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
    <h2 class="mt-5">Resultados da Busca:</h2>
    <div
      v-if="isLoading"
      class="col-md-4 d-flex align-items-center justify-content-center"
    >
      <div class="card">
        <div class="card-body text-center">
          <div class="spinner-border" role="status"></div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div
        class="col-md-4 mt-3"
        v-for="artwork in artworks"
        :key="artwork.objectID"
      >
        <div class="card">
          <div v-if="artwork.primaryImage">
            <img
              :src="artwork.primaryImage"
              :alt="artwork.title"
              class="card-img-top"
            />
          </div>
          <div v-else class="no-image-available">Sem imagem disponível</div>
          <button
          class="btn btn-primary m-2"
          :class="{ 'btn-primary': !isFavorite(artwork), 'btn-danger': isFavorite(artwork) }"
          @click="toggleFavorite(artwork)"
        >
          {{ isFavorite(artwork) ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }}
        </button>
          <div class="card-body">
            <h5 class="card-title">{{ artwork.title }}</h5>
            <p class="card-text">
              <strong>Artista:</strong> {{ artwork.artistDisplayName }}
            </p>
            <p class="card-text">
              <strong>Localização:</strong> {{ artwork.repository }}
            </p>
            <p class="card-text">
              <strong>Descrição:</strong> {{ artwork.objectName }}
            </p>
            <p :class="{'text-success': artwork.isPublicDomain, 'text-danger': !artwork.isPublicDomain}" class="card-text">
              <strong>Domínio Público:</strong> {{ artwork.isPublicDomain ? 'Sim' : 'Não' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchArtworksByArtist, searchArtworksByLocation, searchArtworksByTitle } from '@/api.js';

export default {
  name: "searchComponent",
  props: {
    msg: String,
  },
  

  data() {
    return {
      searchArtist: "",
      searchLocation: "",
      searchTitle: "",
      artworks: [],
      selectedArtwork: null,
      isLoading: false,
      favoriteArtworks: [],
    };
  },
  mounted() {
  this.loadFavorites();
},  
  methods: {
    toggleFavorite(artwork) {
    if (this.isFavorite(artwork)) {
      this.removeFavorite(artwork);
    } else {
      this.addFavorite(artwork);
    }
  },
  isFavorite(artwork) {
    return this.favoriteArtworks.some((favorite) => favorite.objectID === artwork.objectID);
  },
  addFavorite(artwork) {
    this.favoriteArtworks.push(artwork);
    this.saveFavorites();
  },
  removeFavorite(artwork) {
    this.favoriteArtworks = this.favoriteArtworks.filter((favorite) => favorite.objectID !== artwork.objectID);
    this.saveFavorites();
  },
  saveFavorites() {
    localStorage.setItem('favoriteArtworks', JSON.stringify(this.favoriteArtworks));
  },
  loadFavorites() {
    const storedFavorites = localStorage.getItem('favoriteArtworks');
    if (storedFavorites) {
      this.favoriteArtworks = JSON.parse(storedFavorites);
    }
  },
  async searchByArtist() {
      this.isLoading = true;
      this.artworks = await searchArtworksByArtist(this.searchArtist);
      this.isLoading = false;
    },
    async searchByLocation() {
      this.isLoading = true;
      this.artworks = await searchArtworksByLocation(this.searchLocation);
      this.isLoading = false;
    },
    async searchByTitle() {
      this.isLoading = true;
      this.artworks = await searchArtworksByTitle(this.searchTitle);
      this.isLoading = false;
    },
  },
};
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
.no-image-available {
  text-align: center;
  padding: 10px;
  background-color: #f2f2f2;
  color: #555;
  font-style: italic;
}
</style>
