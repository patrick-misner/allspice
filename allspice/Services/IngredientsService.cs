using allspice.Models;
using allspice.Repositories;

namespace allspice.Services
{
  public class IngredientsService
  {
    private readonly IngredientsRepository _repo;

    public IngredientsService(IngredientsRepository repo)
    {
      _repo = repo;
    }

    internal Ingredient Create(Ingredient ingredientData)
    {
      return _repo.Create(ingredientData);
    }

    // internal Ingredient Edit(Ingredient ingredientData)
    // {
    //     // Ingredient original = Get(ingredientData.Id);
    //     original.Name = ingredientData.Name ?? original.Name;

    // }
  }
}