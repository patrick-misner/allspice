<template>
  <div
    class="d-flex justify-content-between bg-primary text-white p-2 rounded-top"
  >
    <div class="">
      <span class="fs-3 p-3"> Create Recipe </span>
    </div>

    <div>
      <button
        type="button"
        class="btn-close btn btn-light bg-light m-3"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  </div>
  <form @submit.prevent="postRecipe">
    <div class="row pt-3 p-3">
      <div class="col-lg-6">
        <div class="form-floating mb-3">
          <input
            v-model="editable.title"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Title"
            required
          />
          <label for="floatingInput">Title</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="editable.subtitle"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Subtitle"
            required
          />
          <label for="floatingInput">Subtitle</label>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="form-floating">
          <select
            v-model="editable.category"
            class="form-select mb-3"
            id="floatingSelect"
            aria-label="Floating label select example"
            required
          >
            <option value="" selected>Please select...</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Salad">Salad</option>
            <option value="Sides">Sides</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Dessert">Dessert</option>
          </select>
          <label for="floatingSelect">Select Category</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="editable.picture"
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="img URL"
          />
          <label for="floatingInput">Image URL</label>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end p-3">
      <button
        type="button"
        class="btn btn-light"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        Cancel
      </button>
      <button type="submit" class="btn btn-secondary mx-3">Submit</button>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { recipesService } from "../services/RecipesService"
import { Modal } from "bootstrap"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async postRecipe() {
        try {
          await recipesService.createRecipe(editable.value)
          Modal.getOrCreateInstance(document.getElementById("recipe-form")).hide()
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById("active-recipe")).show()
          Pop.toast("recipe created!", "success")
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
</style>