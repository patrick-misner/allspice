<template>
  <div class="row justify-content-center">
    <div class="col-lg-6 overflow">
      <div
        class="
          d-flex
          rounded
          text-primary
          justify-content-around
          bg-light
          elevation-3
          p-3
          m-3
          align-items-center
        "
      >
        <span
          :class="[
            recipeView == 'Home' && !search
              ? 'selectable bg-primary rounded p-2 elevation-2'
              : 'selectable p-2',
          ]"
          @click="returnHome()"
          >Home</span
        >
        <span
          :class="[
            recipeView == 'myRecipes'
              ? 'selectable bg-primary rounded p-2 elevation-2'
              : 'selectable p-2',
          ]"
          @click="recipeView = 'myRecipes'"
          href=""
        >
          My Recipes</span
        >
        <span
          :class="[
            recipeView == 'Favorites'
              ? 'selectable bg-primary rounded p-2 elevation-2'
              : 'selectable p-2',
          ]"
          @click="recipeView = 'Favorites'"
          >Favorites</span
        >
      </div>
    </div>
  </div>
  <div class="row">
    <div v-if="search == true" class="text-center text-muted">
      <span>Search results for "{{ searchWord }}" </span>
    </div>
    <div
      v-if="search == true && recipeView == 'Home' && recipes.length < 1"
      class="text-center text-danger mt-3"
    >
      <span> No results </span>
    </div>
    <Recipe v-for="r in recipes" :key="r.id" :recipe="r" />
    <div v-if="recipes.length < 1" class="col-12">
      <div class="d-flex justify-content-center">
        <span
          v-if="recipeView == 'Favorites' && account.id && !search"
          class="text-muted"
          >You have not added any recipes to your favorites
        </span>

        <span
          v-if="recipeView == 'Favorites' && account.id && search"
          class="text-danger mt-3"
          >no matches under favorites
        </span>

        <div v-if="recipeView == 'myRecipes' && account.id && !search">
          <span class="text-muted"> You have not added any recipes.</span>
          <a href=""></a>

          <div class="text-center m-3">
            <button
              @click="createRecipe"
              class="btn btn-primary"
              title="Add a Recipe"
            >
              Add Recipe
            </button>
          </div>
        </div>

        <span
          v-if="recipeView == 'myRecipes' && account.id && search"
          class="text-danger mt-3"
          >no matches under my recipes
        </span>

        <div v-if="!account.id" class="">
          <span class="text-muted"
            >You must be signed in to view your recipes or favorites.
          </span>
          <div class="text-center mt-3">
            <button @click="login" class="btn btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 text-primary add-icon grow">
    <i
      @click="createRecipe"
      class="mdi mdi-plus-circle selectable"
      style="font-size: 60px"
    ></i>
  </div>

  <Modal id="active-recipe">
    <template #body>
      <ActiveRecipe v-if="activeProvider.id" />
    </template>
  </Modal>

  <Modal id="recipe-form">
    <template #body>
      <RecipeForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import draggable from 'vuedraggable';
import { recipesService } from "../services/RecipesService"
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { accountService } from "../services/AccountService";
import { AuthService } from "../services/AuthService";
export default {
  name: 'Home',
  setup() {
    const recipeView = ref('Home');
    onMounted(async () => {
      try {
        await recipesService.getRecipes()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    });
    watchEffect(async () => {
      try {
        if (AppState.account.id)
          await accountService.getFavorites()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    });
    function filterRecipe(rview) {
      if (rview == 'Home') {
        return r => true
      }
      if (rview == 'Favorites') {
        return r => r.isFavorite == true
      }
      if (rview == 'myRecipes') {
        return r => r.creatorId == AppState.account.id
      }
    }

    return {
      recipeView,
      filterRecipe,
      recipes: computed(() => AppState.recipes.filter(filterRecipe(recipeView.value))),
      activeProvider: computed(() => AppState.activeRecipe),
      account: computed(() => AppState.account),
      favorites: computed(() => AppState.favorites),
      search: computed(() => AppState.search),
      searchWord: computed(() => AppState.searchWord),
      createRecipe() {
        Modal.getOrCreateInstance(document.getElementById('recipe-form')).show()
      },
      async login() {
        AuthService.loginWithPopup();
      },
      async returnHome() {
        recipeView.value = 'Home'
        if (AppState.search) {
          try {
            AppState.search = false
            await recipesService.getRecipes()
            if (AppState.account.id) {
              await accountService.getFavorites()
            }
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }

        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
}
.home-card {
  width: 50vw;
  > img {
    height: 200px;
    max-width: 200px;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
}
.grow {
  transition: all 0.1s ease-in-out;
}

.grow:hover {
  transform: scale(1.05);
}

.home-bar {
  position: absolute;
  top: 150px;
}

.overflow {
  transform: translateY(-50px);
}
</style>
