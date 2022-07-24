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

    internal Favorite GetFavorite(Favorite favoriteData)
    {
      string sql = @"
      SELECT *
      FROM favorites
      WHERE recipeId = @RecipeId AND accountId = @AccountId;
      ";
      return _db.QueryFirstOrDefault<Favorite>(sql, favoriteData);
    }

    internal void Delete(Favorite original)
    {
      string sql = "DELETE FROM favorites WHERE id = @Id LIMIT 1";
      _db.Execute(sql, original);
    }
  }
}