using System.Data;
using allspice.Models;
using Dapper;

namespace allspice.Repositories
{
  public class FavoritesRepository
  {
    private readonly IDbConnection _db;

    public FavoritesRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Favorite Create(Favorite favoriteData)
    {
      string sql = @"
      INSERT INTO favorites
      (accountId, recipeId)
      VALUES
      (@AccountId, @RecipeId);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, favoriteData);
      favoriteData.Id = id;
      return favoriteData;
    }
  }
}