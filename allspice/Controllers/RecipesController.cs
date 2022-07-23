using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using allspice.Models;
using allspice.Services;
using CodeWorks.Auth0Provider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace allspice.Controllers
{
  [ApiController]
  [Route("api/[controller]")]

  public class RecipesController : ControllerBase
  {
    private readonly RecipesService _rServ;

    private readonly IngredientsService _iServ;

    public RecipesController(RecipesService rServ, IngredientsService iServ)
    {
      _rServ = rServ;
      _iServ = iServ;
    }

    [HttpGet]
    public ActionResult<List<Recipe>> Get()
    {
      try
      {
        List<Recipe> recipes = _rServ.Get();
        return Ok(recipes);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpGet("{id}")]
    public ActionResult<Recipe> Get(int id)
    {
      try
      {
        Recipe recipe = _rServ.Get(id);
        return Ok(recipe);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}/ingredients")]
    public ActionResult<List<Ingredient>> GetIngredients(int id)
    {
      try
      {
        List<Ingredient> ingredients = _iServ.GetByRecipeId(id);
        return Ok(ingredients);
      }
      catch (Exception e)
      {

        return BadRequest(e.Message);
      }
    }


    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Recipe>> Create([FromBody] Recipe recipeData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        recipeData.CreatorId = userInfo.Id;
        Recipe newRecipe = _rServ.Create(recipeData);
        newRecipe.Creator = userInfo;
        return Ok(newRecipe);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<Recipe>> EditAsync(int id, [FromBody] Recipe recipeData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        recipeData.Id = id;
        recipeData.CreatorId = userInfo.Id;
        Recipe update = _rServ.Edit(recipeData);
        return Ok(update);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<Recipe>> DeleteAsync(int id)
    {
      Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
      try
      {
        Recipe deletedRecipe = _rServ.Delete(id, userInfo.Id);
        return Ok(deletedRecipe);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}