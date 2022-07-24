<template>
  <div class="col-4">
    <div
      class="bg-grey elevation-2 m-3 card-bg rounded position-relative"
      :style="`background-image: url(${recipe.picture})`"
    >
      <div class="d-flex justify-content-between">
        <span class="bg-grey text-shadow m-2 rounded-pill p-2 card-content"
          ><b>{{ recipe.category }}</b></span
        >
        <span class="bg-grey text-shadow m-2 rounded p-2 grow card-content"
          ><b><i class="mdi mdi-heart text-danger selectable grow"></i></b
        ></span>
      </div>
      <div class="">
        <div
          class="
            bg-grey
            text-shadow
            rounded
            m-2
            p-2
            card-content
            w-100
            position-absolute
            bottom-0
            border-5 border-dark
          "
        >
          <h4>{{ recipe.title }}</h4>
          <h5>{{ recipe.subtitle }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
export default {
  props: { recipe: { type: Object, required: true } },
  setup(props) {
    return {
      recipes: computed(() => AppState.recipes)
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
  backdrop-filter: blur(1px);
}
.grow {
  transition: all 0.1s ease-in-out;
}

.grow:hover {
  transform: scale(1.05);
}
</style>