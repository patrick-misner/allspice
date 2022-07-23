using System;
using System.Collections.Generic;
using allspice.Models;
using allspice.Repositories;

namespace allspice.Services
{
  public class StepsService
  {
    private readonly StepsRepository _repo;
    private readonly RecipesService _rServ;

    public StepsService(StepsRepository repo, RecipesService rServ)
    {
      _repo = repo;
      _rServ = rServ;
    }

    internal Step Create(Step stepData, string userId)
    {
      Recipe found = _rServ.Get(stepData.RecipeId);
      if (found.CreatorId != userId)
      {
        throw new Exception("You are not the owner of the recipe");
      }
      _repo.Create(stepData);
      return stepData;
    }

    internal Step Get(int id)
    {
      Step found = _repo.Get(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      return found;
    }

    internal Step Edit(Step stepData, string userId)
    {
      Step original = this.Get(stepData.Id);
      Recipe found = _rServ.Get(original.RecipeId);
      if (found.CreatorId != userId)
      {
        throw new Exception("You are not the owner of the recipe");
      }
      original.Position = stepData.Position ?? original.Position;
      original.Body = stepData.Body ?? original.Body;
      _repo.Edit(original);
      return original;
    }

    internal Step Delete(int id, string userId)
    {
      Step original = this.Get(id);
      Recipe found = _rServ.Get(original.RecipeId);
      if (userId != found.CreatorId)
      {
        throw new Exception("You do not own the recipe for this step");
      }
      _repo.Delete(original);
      return original;
    }

    internal List<Step> GetByRecipeId(int stepId)
    {
      List<Step> steps = _repo.GetByRecipeId(stepId);
      return steps;
    }
  }
}