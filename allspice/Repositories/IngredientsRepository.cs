using System.Data;
using allspice.Models;
using Dapper;

namespace allspice.Repositories
{
  public class IngredientsRepository
  {
    private readonly IDbConnection _db;

    public IngredientsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Ingredient Create(Ingredient ingredientData)
    {
      string sql = @"
        INSERT INTO ingredients
        (name, quantity, recipeId)
        VALUES
        (@Name, @Quantity, @RecipeId)
        ";
      int id = _db.ExecuteScalar<int>(sql, ingredientData);
      ingredientData.Id = id;
      return ingredientData;
    }
  }
}