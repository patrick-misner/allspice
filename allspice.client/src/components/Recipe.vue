<template>
  <div class="col-lg-4 col-md-6">
    <div
      @click="triggerModal"
      class="
        bg-grey
        elevation-2
        m-3
        card-bg
        rounded
        position-relative
        grow-card
        selectable
      "
      :style="`background-image: url(${recipe.picture})`"
    >
      <div class="d-flex justify-content-between">
        <span
          class="
            bg-grey
            text-shadow
            elevation-2
            m-2
            rounded-pill
            p-2
            card-content
          "
          ><b>{{ recipe.category }}</b></span
        >
        <span
          class="
            bg-grey
            text-shadow
            m-2
            rounded
            p-2
            elevation-2
            grow
            card-content
          "
          ><b>
            <i
              v-if="recipe.isFavorite"
              @click.stop="favoriteRecipe"
              class="mdi mdi-heart text-danger selectable grow"
            ></i>

            <i
              v-else
              @click.stop="favoriteRecipe"
              class="mdi mdi-heart-outline text-danger selectable grow"
            ></i> </b
        ></span>
      </div>
      <div class="position-absolute bottom-0 w-100">
        <div
          class="
            bg-grey
            text-shadow
            elevation-2
            rounded
            m-3
            p-3
            card-content
            border-5 border-dark
          "
        >
          <h4>{{ recipe.title }}</h4>
          <span>{{ recipe.subtitle }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { recipesService } from "../services/RecipesService"
import Pop from "../utils/Pop"
export default {
  props: { recipe: { type: Object, required: true } },
  setup(props) {
    return {
      recipes: computed(() => AppState.recipes),
      async triggerModal() {
        AppState.activeRecipe = props.recipe
        logger.log(AppState.activeRecipe)
        Modal.getOrCreateInstance(document.getElementById('active-recipe')).show()
      },
      async favoriteRecipe() {
        try {
          await recipesService.favoriteRecipe(props.recipe.id)
          if (props.recipe.isFavorite) {
            Pop.toast("Recipe added to favorites", 'success')
          }
          else Pop.toast('Recipe removed from favorites', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }


}
</script>

<style>
.card-bg {
  height: 400px;
  min-height: 400px;
  background-position: 50% 60%;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-content {
  backdrop-filter: blur(2px);
}
.grow {
  transition: all 0.1s ease-in-out;
}

.grow:hover {
  transform: scale(1.05);
}
.grow-card {
  transition: all 0.1s ease-in-out;
}

.grow-card:hover {
  transform: scale(1.001);
}
</style>