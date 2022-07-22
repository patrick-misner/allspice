using System;
using allspice.Models;
using allspice.Repositories;

namespace allspice.Services
{
  public class IngredientsService
  {
    private readonly IngredientsRepository _repo;
    private readonly RecipesService _rServ;

    public IngredientsService(IngredientsRepository repo, RecipesService rServ)
    {
      _repo = repo;
      _rServ = rServ;
    }






    internal Ingredient Create(Ingredient ingredientData, string userId)
    {
      Recipe found = _rServ.Get(ingredientData.RecipeId);
      if (found == null)
      {
        throw new Exception("Did not find a valid RecipeId for this ingredient");
      }
      if (found.CreatorId != userId)
      {
        throw new Exception("You are not the owner of the recipe");
      }
      _repo.Create(ingredientData);
      return (ingredientData);
    }

    // internal Ingredient Edit(Ingredient ingredientData)
    // {
    //     // Ingredient original = Get(ingredientData.Id);
    //     original.Name = ingredientData.Name ?? original.Name;

    // }
  }
}