import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RecipesService {

  async getRecipes() {
    const res = await api.get('api/recipes')
    logger.log(res.data)
    AppState.recipes = res.data
  }

  async getIngredients(recipeId) {
    const res = await api.get('api/recipes/' + recipeId + '/ingredients')
    AppState.ingredients = res.data
  }

  async getSteps(recipeId) {
    const res = await api.get('api/recipes/' + recipeId + '/steps')
    AppState.steps = res.data
  }

  async createRecipe(recipeData) {
    const res = await api.post('/api/recipes', recipeData)
    AppState.recipes.push(res.data)
    return res.data
  }

  async favoriteRecipe(recipeId) {
    const res = await api.post('api/recipes/' + recipeId + '/favorite')
  }
}

export const recipesService = new RecipesService()