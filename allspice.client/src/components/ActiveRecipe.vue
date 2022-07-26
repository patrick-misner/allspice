<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-lg-4 modal-col1 text-end modal-round"
        :style="`background-image: url(${recipe.picture})`"
      ></div>

      <div class="col-lg-8 pt-3 p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="text-secondary fs-3">{{ recipe.title }}</span>
            <span class="bg-grey rounded-pill p-1 px-3 mx-3">{{
              recipe.category
            }}</span>
            <p>{{}}</p>
          </div>

          <div class="position-absolute top-0 end-0 p-2">
            <div class="dropdown" v-if="recipe.creatorId == account.id">
              <a
                class="btn"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="mdi mdi-dots-horizontal ellipses"></i>
              </a>

              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <a
                    @click="deleteRecipe"
                    class="
                      dropdown-item
                      text-danger
                      d-flex
                      justify-content-between
                    "
                    href="#"
                    >Delete<i class="mdi mdi-trash-can"> </i
                  ></a>
                </li>
              </ul>
              <button
                type="button"
                class="btn-close btn btn-light bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
        <span class="text-grey fs-4"> {{ recipe.subtitle }}</span>

        <!-- NOTE STEPS -->
        <div class="row pt-5">
          <div class="col-lg-6">
            <Steps />
          </div>

          <!-- NOTE INGREDIENTS -->
          <div class="col-lg-6 mb-5">
            <Ingredients />
          </div>
        </div>
      </div>
    </div>

    <div class="published p-2">
      <span>published by: {{ recipe.creator.name }}</span>
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
import Steps from "./Steps.vue"
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
        AppState.account;
        if (AppState.activeRecipe.id) {
          await recipesService.getIngredients(AppState.activeRecipe.id);
          await recipesService.getSteps(AppState.activeRecipe.id);
        }
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      ingredientData,
      stepData,
      recipe: computed(() => AppState.activeRecipe),
      ingredients: computed(() => AppState.ingredients),
      steps: computed(() => AppState.steps),
      account: computed(() => AppState.account),
      async deleteRecipe() {
        try {
          if (await Pop.confirm("Are you sure you want to delete this recipe?")) {
            await recipesService.deleteRecipe(this.recipe.id);
            Modal.getOrCreateInstance(document.getElementById("active-recipe")).hide();
            Pop.toast("Recipe deleted", "success");
          }
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async deleteStep(stepId) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this step?")) {
            await stepsService.deleteStep(stepId);
            Pop.toast("Step deleted", "success");
          }
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async deleteIngredient(ingredientId) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this ingredient?")) {
            await ingredientsService.deleteIngredient(ingredientId);
            Pop.toast("Step deleted", "success");
          }
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async addIngredient() {
        try {
          await ingredientsService.createIngredient(ingredientData.value);
          ingredientData.value.name = "";
          ingredientData.value.quantity = "";
          Pop.toast("Ingredient Added!", "success");
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async addStep() {
        try {
          await stepsService.createStep(stepData.value);
          stepData.value.body = "";
          Pop.toast("Step added!", "success");
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      }
    };
  },
  components: { Steps }
}
</script>

<style scoped>
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
    min-height: 750px;
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