<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center bg-primary rounded">
        <h3>Recipe Steps</h3>
      </div>
      <draggable
        tag="ul"
        :list="list"
        class="list-group"
        handle=".handle"
        :disabled="stepsView == ''"
        item-key="name"
      >
        <template #item="{ element, index }">
          <li
            :class="
              stepsView == 'Edit'
                ? 'list-group-item align-items-center d-flex justify-content-between p-2'
                : 'list-group-item'
            "
          >
            <i
              v-if="stepsView == 'Edit'"
              class="mdi mdi-reorder-horizontal handle me-2"
            ></i>
            <span
              ><b>{{ index + 1 + "." }}</b></span
            >
            <input
              v-if="stepsView == 'Edit'"
              type="text-area"
              class="form-control form-control-sm"
              v-model="element.body"
            />
            <span v-if="stepsView == ''" class="mx-2">
              {{ element.body }}
            </span>

            <i
              v-if="stepsView == 'Edit'"
              class="mdi mdi-close close text-danger"
              @click="removeAt(index)"
            ></i>
          </li>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
  <div v-if="stepsView == 'Edit'" class="d-flex justify-content-end my-3">
    <button @click="sortSteps()" class="btn btn-primary">Save</button>
  </div>
  <div v-if="stepsView == ''" class="d-flex justify-content-end my-3">
    <button @click="stepsView = 'Edit'" class="btn btn-primary">Edit</button>
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
export default {
  name: "handle",
  display: "Handle",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    draggable
  },
  data() {
    return {
      list: computed(() => AppState.steps),
      dragging: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function () {
      id++;
      this.list.push({ name: "Juan " + id, id, text: "" });
    }
  },
  setup() {
    const stepsView = ref('');
    return {
      stepsView,
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
          stepsView.value = ''
          Pop.toast("Steps updated!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
};

</script>

<style scoped>
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
</style>