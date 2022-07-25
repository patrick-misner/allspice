import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class IngredientsService {

  async deleteIngredient(ingredientId) {
    const res = await api.delete('api/ingredients/' + ingredientId)
    AppState.ingredients = AppState.ingredients.filter(i => i.id != ingredientId)
  }

  async createIngredient(ingredientData) {
    const res = await api.post('api/ingredients', ingredientData)
    AppState.ingredients.push(res.data)
  }
}

export const ingredientsService = new IngredientsService()