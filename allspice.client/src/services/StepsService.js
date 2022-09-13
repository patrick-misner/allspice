import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class StepsService {

  async deleteStep(stepId) {
    const res = await api.delete('api/steps/' + stepId)
    AppState.steps = AppState.steps.filter(s => s.id != stepId)
  }

  async createStep(stepData) {
    const res = await api.post('api/steps', stepData)
    AppState.steps.push(res.data)
  }

  async updateStep(body) {
    const res = await api.put('api/steps/' + body.id, body)
  }

}

export const stepsService = new StepsService()