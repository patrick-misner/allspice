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
              v-if="account.id == recipe.creatorId"
              @click="deleteRecipe"
              type="button"
              class="btn btn-danger mx-3"
            >
              Delete <i class="mdi mdi-trash-can"></i>
            </button>
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
                <li v-for="s in steps" :key="s.id" class="py-2">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span>{{ s.body }}</span>
                    <i
                      v-if="account.id == recipe.creatorId"
                      @click="deleteStep(s.id)"
                      class="mdi mdi-trash-can text-danger selectable grow"
                    ></i>
                  </div>
                </li>
              </ol>
            </div>
            <form
              v-if="account.id == recipe.creatorId"
              @submit.prevent="addStep"
            >
              <div class="mb-3">
                <input
                  v-model="stepData.body"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Add Step"
                  required
                />
                <div class="text-end m-2">
                  <button type="submit" class="btn btn-primary">Add</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-6">
            <div class="elevation-2 rounded">
              <div class="text-center bg-primary rounded">
                <h3>Ingredients</h3>
              </div>
              <ul>
                <li v-for="i in ingredients" :key="i.id" class="py-2">
                  <div class="d-flex justify-content-between">
                    <div>
                      <span>{{ i.quantity + " of " }}</span>
                      <span> {{ i.name }}</span>
                    </div>
                    <div>
                      <i
                        @click="deleteIngredient(i.id)"
                        class="mdi mdi-trash-can selectable grow text-danger"
                      ></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="account.id == recipe.creatorId" class="mb-3">
              <form @submit.prevent="addIngredient">
                <input
                  v-model="ingredientData.name"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Ingredient name..."
                  required
                />

                <input
                  v-model="ingredientData.quantity"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Qty: 2 tbsp..."
                  required
                />

                <div class="text-end">
                  <button type="submit" class="btn btn-primary m-2">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-end published p-3">
          published by: {{ recipe.creator.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
import { recipesService } from "../services/RecipesService"
import { stepsService } from "../services/StepsService"
import { ingredientsService } from "../services/IngredientsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
export default {
  setup() {
    const ingredientData = ref({
      recipeId: AppState.activeRecipe.id
    });
    const stepData = ref({
      recipeId: AppState.activeRecipe.id,
      position: 1
    });
    watchEffect(async () => {
      try {
        AppState.account
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
      ingredientData,
      stepData,
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.ingredients),
      steps: computed(() => AppState.steps),
      account: computed(() => AppState.account),
      async deleteRecipe() {
        try {
          if (await Pop.confirm('Are you sure you want to delete this recipe?')) {
            await recipesService.deleteRecipe(this.recipe.id)
            Modal.getOrCreateInstance(document.getElementById("active-recipe")).hide()
            Pop.toast('Recipe deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async deleteStep(stepId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this step?')) {
            await stepsService.deleteStep(stepId)
            Pop.toast('Step deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async deleteIngredient(ingredientId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this ingredient?')) {
            await ingredientsService.deleteIngredient(ingredientId)
            Pop.toast('Step deleted', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async addIngredient() {
        try {
          await ingredientsService.createIngredient(ingredientData.value)
          ingredientData.value = ""
          Pop.toast("Ingredient Added!", "success")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async addStep() {
        try {
          await stepsService.createStep(stepData.value)
          stepData.value = ""
          Pop.toast("Step added!", 'success')
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
.published {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>