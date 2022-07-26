<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-lg-4 modal-col1 text-end modal-round"
        :style="`background-image: url(${recipe.picture})`"
      >
        <i class="text-danger fs-1 mdi mdi-heart-outline bg-grey rounded"></i>
      </div>

      <div class="col-lg-8 pt-3 p-3">
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
          <div class="col-lg-6">
            <div class="text-center bg-primary rounded">
              <h3>Recipe Steps</h3>
            </div>
            <draggable
              tag="ul"
              class="list-group"
              handle=".handle"
              :list="list1"
              @change="sortSteps()"
              item-key="body"
            >
              <template #item="{ element }">
                <div
                  class="
                    list-group-item
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <div class="">
                    <i
                      v-if="
                        account.id == recipe.creatorId && stepsView == 'Sort'
                      "
                      class="mdi mdi-reorder-horizontal fs-4 me-2"
                    >
                    </i>
                    <span class="me-2"
                      ><B>{{ element.position + ": " }}</B></span
                    ><span
                      v-if="stepsView !== 'Edit'"
                      :contenteditable="stepsView == 'Edit'"
                      >{{ element.body }}</span
                    >
                    <div v-if="stepsView == 'Edit'">
                      <input
                        class="form-control form-control-sm"
                        type="text"
                        v-model="element.body"
                      />
                    </div>
                  </div>

                  <i
                    v-if="account.id == recipe.creatorId && stepsView == 'Sort'"
                    @click="deleteStep({ element })"
                    class="mdi mdi-close text-danger selectable grow text-end"
                  ></i>
                </div>
              </template>
            </draggable>
            <div
              v-if="stepsView == ''"
              class="d-flex justify-content-between mx-2 p-2"
            >
              <button
                class="btn btn-primary rounded-pill"
                @click="stepsView = 'Add'"
                title="Add a Step"
              >
                <i class="mdi mdi-plus fs-4"></i>
              </button>
              <button
                class="btn btn-primary rounded-pill"
                @click="stepsView = 'Edit'"
                title="Edit Steps"
              >
                <i class="mdi mdi-pencil fs-4"></i>
              </button>
              <button
                class="btn btn-primary rounded-pill elevation-2"
                @click="stepsView = 'Sort'"
                title="Sort step order"
              >
                <i class="mdi mdi-swap-vertical-bold fs-4"></i>
              </button>
            </div>

            <form
              v-if="account.id == recipe.creatorId"
              @submit.prevent="addStep"
            >
              <div v-if="stepsView == 'Add'" class="my-3">
                <input
                  v-model="stepData.body"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Add Step"
                  required
                />
                <div class="text-end m-2">
                  <button @click="stepsView = ''" class="btn btn-primary">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary m-1">Add</button>
                </div>
              </div>
              <div
                v-if="stepsView == 'Sort' || stepsView == 'Edit'"
                class="d-flex justify-content-end m-2"
              >
                <button class="btn btn-primary" @click="stepsView = ''">
                  Done
                </button>
              </div>
            </form>
          </div>
          <div class="col-lg-6">
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
                        v-if="account.id == recipe.creatorId"
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

                <div class="text-end mb-5">
                  <button type="submit" class="btn btn-primary m-2">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-end published p-2">
          <span>published by: {{ recipe.creator.name }}</span>
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
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      enabled: true,
      list1: computed(() => AppState.steps),
    };
  },
  methods: {
    log: function (evt) {
      window.console.log(evt);
    }
  },
  setup() {
    const editable = ref({})
    const stepsView = ref('');
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
      stepsView,
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.ingredients),
      account: computed(() => AppState.account),
      steps: computed(() => AppState.steps),
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
          logger.log('delete step', stepId.element.id)
          if (await Pop.confirm('Are you sure you want to delete this step?')) {
            await stepsService.deleteStep(stepId.element.id)
            this.sortSteps()
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
          ingredientData.value.name = ''
          ingredientData.value.quantity = ''
          Pop.toast("Ingredient Added!", "success")
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async addStep() {
        try {
          stepData.value.position = 1
          if (this.steps.length > 0) {
            let lastStep = this.steps[this.steps.length - 1]
            stepData.value.position = lastStep.position + 1
          }
          await stepsService.createStep(stepData.value)
          stepData.value.body = ''
          Pop.toast("Step added!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async updateStep(step) {
        try {
          await stepsService.updateStep(step)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async sortSteps() {
        try {
          logger.log('sort steps ran')
          let steps = AppState.steps
          for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            step.position = i + 1
            this.updateStep(step)
          }
          Pop.toast("Steps updated!", 'success')
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
  height: 250px;
  min-height: 250px;
  background-position: 50% 60%;
  background-size: cover;
  background-repeat: no-repeat;
}

.modal-round {
  border-radius: 5px 5px 0px 0px;
}

@media (min-width: 992px) {
  .modal-col1 {
    min-height: 850px;
    background-position: 50% 60%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .modal-round {
    border-radius: 5px 0px 0px 5px;
  }
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