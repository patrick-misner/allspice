<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center bg-primary rounded">
        <h3>Recipe Steps</h3>
      </div>
      <div v-if="steps < 1" class="text-center text-danger">
        <span>Steps have not been added</span>
      </div>
      <div
        v-if="steps < 1 && recipe.creatorId == account.id"
        class="text-center text-danger"
      >
        <span>Click edit to add steps</span>
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
        handle=".handle"
        :disabled="stepsView == ''"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="position"
      >
        <template #item="{ element, index }">
          <li
            :class="
              stepsView == 'Edit'
                ? 'list-group-item move-list align-items-center d-flex justify-content-between p-2'
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
              placeholder="Step details..."
            />
            <span v-if="stepsView == ''" class="mx-2">
              {{ element.body }}
            </span>

            <i
              v-if="stepsView == 'Edit'"
              class="mdi mdi-close close text-danger delete"
              @click="deleteStep({ element })"
            ></i>
          </li>
        </template>
      </draggable>
    </div>
    <!-- 
    <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>

  <div v-if="stepsView == 'Edit'" class="d-flex justify-content-end m-2"></div>

  <div v-if="stepsView == 'Edit'" class="d-flex justify-content-end my-3">
    <button
      v-if="stepsView == 'Edit'"
      class="btn btn-primary mx-2"
      type="submit"
      @click.prevent="addStep()"
      title="Add a Step"
    >
      Add
    </button>
    <button @click="sortSteps()" class="btn btn-primary" title="Save Steps">
      Save
    </button>
  </div>

  <div
    v-if="stepsView == '' && recipe.creatorId == account.id"
    class="d-flex justify-content-end my-3"
  >
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
  display: "Handle, Transitions",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    draggable
  },
  data() {
    return {
      list: computed(() => AppState.steps),
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
    const stepsView = ref('');
    const stepData = ref({
      recipeId: AppState.activeRecipe.id,
      position: 1
    });
    return {
      stepData,
      stepsView,
      steps: computed(() => AppState.steps),
      account: computed(() => AppState.account),
      recipe: computed(() => AppState.activeRecipe),
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
          let steps = AppState.steps
          for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            step.position = i + 1
            this.updateStep(step)
          }
          stepsView.value = ''
          stepData.value.body = ''
          Pop.toast("Steps updated!", 'success')
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
      async deleteStep(stepId) {
        try {
          logger.log('delete step', stepId.element.id)
          if (await Pop.confirm('Are you sure you want to delete this step?')) {
            await stepsService.deleteStep(stepId.element.id)
            // this.sortSteps()
            Pop.toast('Step removed', 'success')
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
.move-list {
  cursor: move;
}
.delete {
  cursor: pointer;
}
.handle {
  cursor: grab;
}
</style>