<template>
  <div class="container">
    <div class="search-container">
      <h1 class="mt-5">Busca de Obras de Arte</h1>

      <div class="mt-5">
        <div class="row">
          <div class="col-md-4">
            <h2>Buscar por Artista:</h2>
            <div class="form-group">
              <label for="artist">Artista:</label>
              <input
                @keyup.enter="searchByArtist()"
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
              <select
                id="location"
                class="form-control"
                v-model="searchLocation"
              >
                <option value="">Selecione uma opção</option>
                <option value="China">China</option>
                <option value="Europe">Europe</option>
                <option value="France">France</option>
              </select>
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
                @keyup.enter="searchByTitle()"
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
    </div>
    <div class="result">
      <h3 class="mt-5">Resultados da Busca:</h3>
      <div v-if="!isLoading && artworks == null" class="alert alert-info mt-4">
        Sem Dados
      </div>
      <div
        v-if="isLoading"
        class="mt-4 d-flex align-items-center justify-content-center"
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
          <div class="card card-size">
            <div v-if="artwork.primaryImageSmall">
              <img
                v-lazy="artwork.primaryImageSmall"
                :alt="artwork.title"
                class="card-img-top image"
              />
            </div>
            <div v-else class="no-image-available"><p>Sem imagem disponível</p></div>
            <button
              class="btn btn-primary m-2"
              :class="{
                'btn-primary': !isFavorite(artwork),
                'btn-danger': isFavorite(artwork),
              }"
              @click="toggleFavorite(artwork)"
            >
              {{
                isFavorite(artwork)
                  ? "Remover dos favoritos"
                  : "Adicionar aos favoritos"
              }}
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
              <p
                :class="{
                  'text-success': artwork.isPublicDomain,
                  'text-danger': !artwork.isPublicDomain,
                }"
                class="card-text"
              >
                <strong>Domínio Público:</strong>
                {{ artwork.isPublicDomain ? "Sim" : "Não" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIdsFromObject, getObjectById } from "@/api.js";

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
      return this.favoriteArtworks.some(
        (favorite) => favorite.objectID === artwork.objectID
      );
    },
    addFavorite(artwork) {
      this.favoriteArtworks.push(artwork);
      this.saveFavorites();
    },
    removeFavorite(artwork) {
      this.favoriteArtworks = this.favoriteArtworks.filter(
        (favorite) => favorite.objectID !== artwork.objectID
      );
      this.saveFavorites();
    },
    saveFavorites() {
      localStorage.setItem(
        "favoriteArtworks",
        JSON.stringify(this.favoriteArtworks)
      );
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem("favoriteArtworks");
      if (storedFavorites) {
        this.favoriteArtworks = JSON.parse(storedFavorites);
      }
    },
    async searchByArtist() {
      if (this.searchArtist.trim() === "") {
        alert("Por favor, digite o nome do artista.");
        return;
      }
      this.isLoading = true;
      const result = await getIdsFromObject({
        query: this.searchArtist,
        artistOrCulture: true,
      });
      const objects = await this.requestObjects(result.data.objectIDs);
      this.artworks = objects;
      this.isLoading = false;
    },
    async searchByLocation() {
      this.isLoading = true;
      const result = await getIdsFromObject({
        query: "",
        geoLocation: this.searchLocation,
      });
      const objects = await this.requestObjects(result.data.objectIDs);
      this.artworks = objects;
      this.isLoading = false;
    },
    async searchByTitle() {
      this.isLoading = true;
      const result = await getIdsFromObject({
        query: this.searchTitle,
        title: true,
      });
      const objects = await this.requestObjects(result.data.objectIDs);
      this.artworks = objects;
      this.isLoading = false;
    },
    async requestObjects(objectIDs) {
      if (objectIDs != null) {
        const limitedObjectIDs = objectIDs.slice(0, 70);
        const promises = limitedObjectIDs.map((objectID) =>
          getObjectById(objectID)
        );
        const responses = await Promise.allSettled(promises);
        const artworks = responses
          .filter(
            (response) => response.status === "fulfilled" && response.value.data
          )
          .map((response) => response.value.data);
        return artworks;
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  color: #413333;
  font-style: italic;
  width: 100%;
  height: 300px;
}
.search-container {
  background-image: url("../assets/artwork-background.jpg");
  padding: 20px;
  border-radius: 10px; /* Adiciona bordas arredondadas com raio de 10px */
}
h1,
h2,
label {
  color: white;
}
.result {
  margin-top: 10px;
  border: 2px solid #ccc; /* Adiciona uma borda sólida de 1px com cor cinza */
  border-radius: 10px; /* Adiciona bordas arredondadas com raio de 10px */
  padding: 10px; /* Adiciona espaçamento interno */
}
.image {
  object-fit: cover;
  width: 100%;
  height: 300px;
}
.card-size {
  min-height: 650px !important;
  height: auto;
}
</style>
