using System.Collections.Generic;
using System.Data;
using System.Linq;
using allspice.Models;
using Dapper;

namespace allspice.Repositories
{
  public class StepsRepository
  {
    private readonly IDbConnection _db;

    public StepsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Step Create(Step stepData)
    {
      string sql = @"
      INSERT INTO steps
      (position, body, recipeId)
      VALUES
      (@Position, @Body, @RecipeId);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, stepData);
      stepData.Id = id;
      return stepData;
    }

    internal Step Get(int id)
    {
      string sql = @"
      SELECT *
      FROM steps
      WHERE id = @id
      ";
      return _db.QueryFirstOrDefault<Step>(sql, new { id });
    }

    internal void Edit(Step original)
    {
      string sql = @"
      UPDATE steps
      SET
      position = @Position,
      body = @Body
      WHERE id = @Id
      ";
      _db.Execute(sql, original);
    }

    internal void Delete(Step original)
    {
      string sql = "DELETE FROM steps WHERE id = @Id LIMIT 1";
      _db.Execute(sql, original);
    }

    internal List<Step> GetByRecipeId(int id)
    {
      string sql = @"
      SELECT *
      FROM steps
      WHERE recipeId = @id
      ORDER BY steps.position
      ";
      return _db.Query<Step>(sql, new { id }).ToList();
    }
  }
}