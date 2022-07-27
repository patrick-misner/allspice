<template>
  <div class="row justify-content-center">
    <div class="col-md-6 overflow">
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
        "
      >
        <a href="">Home</a>
        <a href=""> My Recipes</a>
        <a href="">Favorites</a>
      </div>
    </div>
  </div>
  <div class="row">
    <Recipe v-for="r in recipes" :key="r.id" :recipe="r" />
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
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { recipesService } from "../services/RecipesService"
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { accountService } from "../services/AccountService";
export default {
  name: 'Home',
  setup() {
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

    return {
      recipes: computed(() => AppState.recipes),
      activeProvider: computed(() => AppState.activeRecipe),
      account: computed(() => AppState.account),
      favorites: computed(() => AppState.favorites),
      createRecipe() {
        Modal.getOrCreateInstance(document.getElementById('recipe-form')).show()
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
