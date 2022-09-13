import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RecipesService {

  async getRecipes() {
    const res = await api.get('api/recipes')
    let recipes = res.data
    recipes.forEach(r => {
      r.isFavorite = false
    });
    AppState.recipes = recipes
  }

  async getIngredients(recipeId) {
    const res = await api.get('api/recipes/' + recipeId + '/ingredients')
    AppState.ingredients = res.data
  }

  async getSteps(recipeId) {
    const res = await api.get('api/recipes/' + recipeId + '/steps')
    AppState.steps = res.data
    let steps = AppState.steps
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      step.position = i + 1
    }
  }

  async createRecipe(recipeData) {
    const res = await api.post('/api/recipes', recipeData)
    AppState.recipes.push(res.data)
    return res.data
  }

  async favoriteRecipe(recipeId) {
    const res = await api.post('api/recipes/' + recipeId + '/favorite')
    let recipe = AppState.recipes.find(r => r.id == recipeId)
    recipe.isFavorite = !recipe.isFavorite
  }

  async deleteRecipe(recipeId) {
    const res = await api.delete('api/recipes/' + recipeId)
    AppState.recipes = AppState.recipes.filter(r => r.id != recipeId)
  }

  async searchRecipes(query) {
    const res = await api.get('api/recipes?query=' + query)
    let recipes = res.data
    recipes.forEach(r => {
      r.isFavorite = false
    });
    AppState.recipes = recipes
  }
}

export const recipesService = new RecipesService()