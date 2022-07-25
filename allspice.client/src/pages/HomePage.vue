<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <div class="d-flex justify-content-around bg-grey elevation-3 p-3 m-3">
        <div><a href=""></a> Home</div>
        <div>My Recipes</div>
        <div>Favorites</div>
      </div>
    </div>
  </div>
  <div class="row">
    <Recipe v-for="r in recipes" :key="r.id" :recipe="r" />
  </div>

  <Modal id="active-recipe">
    <template #body>
      <ActiveRecipe v-if="activeProvider.id" />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { recipesService } from "../services/RecipesService"
import Pop from "../utils/Pop";
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
    return {
      recipes: computed(() => AppState.recipes),
      activeProvider: computed(() => AppState.activeRecipe)
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
}
</style>
