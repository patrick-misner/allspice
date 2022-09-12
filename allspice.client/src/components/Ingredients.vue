<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center bg-primary rounded">
        <h3>Recipe Ingredients</h3>
      </div>
      <div v-if="ingredients < 1" class="text-center text-danger">
        <span>Ingredients have not been added</span>
      </div>
      <div
        v-if="ingredients < 1 && recipe.creatorId == account.id"
        class="text-center text-danger"
      >
        <span>Click edit to add ingredients</span>
      </div>

      <draggable
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          body: !drag ? 'flip-list' : null,
        }"
        :list="list"
        class="list-group"
        disabled="true"
        item-key="position"
      >
        <template #item="{ element, index }">
          <li
            :class="
              ingredientsView == 'Edit'
                ? 'list-group-item align-items-center d-flex justify-content-between p-2'
                : 'list-group-item'
            "
          >
            <input
              v-if="ingredientsView == 'Edit'"
              type="text-area"
              class="form-control form-control-sm mx-2 w-100"
              v-model="element.name"
              placeholder="1 cup of flour..."
            />
            <span v-if="ingredientsView == ''" class="mx-2">
              {{ element.name }}
            </span>

            <i
              v-if="ingredientsView == 'Edit'"
              class="mdi mdi-close close text-danger delete"
              @click="deleteIngredient({ element })"
            ></i>
          </li>
        </template>
      </draggable>
    </div>
    <!-- 
    <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>

  <div
    v-if="ingredientsView == 'Edit'"
    class="d-flex justify-content-end m-2"
  ></div>

  <div v-if="ingredientsView == 'Edit'" class="d-flex justify-content-end my-3">
    <button
      v-if="ingredientsView == 'Edit'"
      class="btn btn-primary mx-2"
      type="submit"
      @click.prevent="addIngredient()"
      title="Add an ingredient"
    >
      Add
    </button>
    <button
      @click="saveIngredients()"
      class="btn btn-primary"
      title="Save Steps"
    >
      Save
    </button>
  </div>

  <div
    v-if="ingredientsView == '' && recipe.creatorId == account.id"
    class="d-flex justify-content-end my-3"
  >
    <button @click="ingredientsView = 'Edit'" class="btn btn-primary">
      Edit
    </button>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
let id = 3;
import draggable from 'vuedraggable'
import { AppState } from "../AppState";
import { stepsService } from "../services/StepsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { ingredientsService } from "../services/IngredientsService";
export default {
  name: "handle",
  display: "Handle, Transitions",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    draggable
  },
  data() {
    return {
      list: computed(() => AppState.ingredients),
      drag: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }

  },
  methods: {
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function () {
      id++;
      this.list.push({ body: "Juan " + id, id, text: "" });
    }
  },
  setup() {
    const ingredientsView = ref('');
    const ingredientData = ref({
      recipeId: AppState.activeRecipe.id
    });
    return {
      ingredientData,
      ingredientsView,
      ingredients: computed(() => AppState.ingredients),
      account: computed(() => AppState.account),
      recipe: computed(() => AppState.activeRecipe),
      async updateIngredient(ingredient) {
        try {
          await ingredientsService.updateIngredient(ingredient)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async saveIngredients() {
        try {
          let ingredients = AppState.ingredients
          for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            this.updateIngredient(ingredient)
          }
          ingredientsView.value = ''
          Pop.toast("Ingredients updated!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async addIngredient() {
        try {
          await ingredientsService.createIngredient(ingredientData.value)
          ingredientData.value.name = ''
          Pop.toast("Ingredient added!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async deleteIngredient(ingredientId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this ingredient?')) {
            await ingredientsService.deleteIngredient(ingredientId.element.id)
            Pop.toast('Ingredient removed', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
};

</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 80%;
}
.text {
  margin: 20px;
}
.delete {
  cursor: pointer;
}
.handle {
  cursor: grab;
}
</style>