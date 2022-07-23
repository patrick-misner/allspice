using System.Collections.Generic;
using System.Data;
using System.Linq;
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

    internal List<Ingredient> GetByRecipeId(int id)
    {
      string sql = @"
        SELECT *
        FROM ingredients
        WHERE recipeId = @id
        ";
      return _db.Query<Ingredient>(sql, new { id }).ToList();
    }
    internal Ingredient Create(Ingredient ingredientData)
    {
      string sql = @"
        INSERT INTO ingredients
        (name, quantity, recipeId)
        VALUES
        (@Name, @Quantity, @RecipeId);
        SELECT LAST_INSERT_ID();
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
    internal void Delete(Ingredient original)
    {
      string sql = "DELETE FROM ingredients WHERE id = @Id LIMIT 1";
      _db.Execute(sql, original);
    }

  }
}