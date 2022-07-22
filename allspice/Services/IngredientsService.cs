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


    internal Ingredient Get(int id)
    {
      Ingredient found = _repo.Get(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      return found;
    }



    internal Ingredient Create(Ingredient ingredientData, string userId)
    {
      Recipe found = _rServ.Get(ingredientData.RecipeId);
      if (found.CreatorId != userId)
      {
        throw new Exception("You are not the owner of the recipe");
      }
      _repo.Create(ingredientData);
      return (ingredientData);
    }



    internal Ingredient Edit(Ingredient ingredientData, string userId)
    {
      Ingredient original = this.Get(ingredientData.Id);
      Recipe found = _rServ.Get(original.RecipeId);
      if (found.CreatorId != userId)
      {
        throw new Exception("You are not the owner of the recipe");
      }
      original.Name = ingredientData.Name ?? original.Name;
      original.Quantity = ingredientData.Quantity ?? original.Quantity;
      _repo.Edit(original);
      return original;

    }

    internal Ingredient Delete(int id, string userId)
    {
      Ingredient original = this.Get(id);
      Recipe found = _rServ.Get(original.RecipeId);
      if (userId != found.CreatorId)
      {
        throw new Exception("You do not own the recipe for this ingredient");
      }
      _repo.Delete(original);
      return original;
    }
  }
}