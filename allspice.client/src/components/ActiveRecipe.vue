<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-4 modal-col1 text-end"
        :style="`background-image: url(${recipe.picture})`"
      >
        <i class="text-danger fs-1 mdi mdi-heart-outline bg-grey rounded"></i>
      </div>

      <div class="col-8 pt-3 p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="text-secondary fs-3">{{ recipe.title }}</span>
            <span class="bg-grey rounded-pill p-1 px-3 mx-3">{{
              recipe.category
            }}</span>
          </div>

          <div class="">
            <button
              type="button"
              class="btn-close btn btn-light bg-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <span class="text-grey fs-4"> {{ recipe.subtitle }}</span>

        <div class="row pt-5">
          <div class="col-6">
            <div class="elevation-2 rounded">
              <div class="text-center bg-primary rounded">
                <h3>Recipe Steps</h3>
              </div>
              <ol>
                <li v-for="s in steps" :key="s.id">{{ s.body }}</li>
              </ol>
            </div>
          </div>
          <div class="col-6">
            <div class="elevation-2 rounded">
              <div class="text-center bg-primary rounded">
                <h3>Ingredients</h3>
              </div>
              <ul>
                <li v-for="i in ingredients" :key="i.id">
                  {{ i.quantity }} {{ i.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div
              class="
                d-flex
                justify-content-end
                align-items-end
                h-100
                position-absolute
                bottom-0
              "
            >
              published by: {{ recipe.creator.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { recipesService } from "../services/RecipesService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup() {
    watchEffect(async () => {
      try {
        AppState.activeRecipe
        if (AppState.activeRecipe.id) {
          await recipesService.getIngredients(AppState.activeRecipe.id)
          await recipesService.getSteps(AppState.activeRecipe.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.ingredients),
      steps: computed(() => AppState.steps)
    }
  }
}
</script>

<style>
.modal-col1 {
  height: 550px;
  min-height: 550px;
  background-position: 50% 60%;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-content {
  backdrop-filter: blur(1px);
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