using System;
using System.Collections.Generic;
using allspice.Models;
using allspice.Repositories;

namespace allspice.Services
{
  public class RecipesService
  {
    private readonly RecipesRepository _repo;

    public RecipesService(RecipesRepository repo)
    {
      _repo = repo;
    }
    internal List<Recipe> Get()
    {
      return _repo.Get();
    }
    internal Recipe Get(int id)
    {
      Recipe found = _repo.Get(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      return found;
    }
    internal Recipe Create(Recipe recipeData)
    {
      return _repo.Create(recipeData);
    }
    internal Recipe Edit(Recipe recipeData)
    {
      Recipe original = Get(recipeData.Id);
      if (recipeData.CreatorId != original.CreatorId)
      {
        throw new Exception("You cannot edit this");
      }
      original.Picture = recipeData.Picture ?? original.Picture;
      original.Title = recipeData.Title ?? original.Title;
      original.Subtitle = recipeData.Subtitle ?? original.Subtitle;
      original.Category = recipeData.Category ?? original.Category;

      _repo.Edit(original);
      return original;
    }
    internal Recipe Delete(int id, string userId)
    {

      Recipe original = Get(id);
      _repo.Delete(id);
      return original;
    }
  }
}