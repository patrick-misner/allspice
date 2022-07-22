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


    internal Ingredient Get(int id)
    {
      string sql = @"
        SELECT *
        FROM ingredients
        WHERE id = @id
        ";
      return _db.QueryFirstOrDefault<Ingredient>(sql, new { id });
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

    internal void Edit(Ingredient original)
    {
      string sql = @"
        UPDATE ingredients
        SET
        name = @Name,
        quantity = @Quantity
        WHERE id =@Id
        ";
      _db.Execute(sql, original);
    }

  }
}