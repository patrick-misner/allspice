import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getFavorites() {
    const res = await api.get('/account/favorites')
    let favorites = res.data
    favorites.forEach(f => {
      let recipe = AppState.recipes.find(r => f.id == r.id)
      if (recipe) {
        recipe.isFavorite = true
      }
    });
    AppState.favorites = favorites
  }
}

export const accountService = new AccountService()
