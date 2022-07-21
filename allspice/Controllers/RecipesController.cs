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

    public RecipesController(RecipesService rServ)
    {
      _rServ = rServ;
    }

    [HttpGet]
    public ActionResult<List<Recipe>> Get()
    {
      try
      {
        List<Recipe> recipes = _rServ.Get();
        return Ok(recipes)
          }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpGet("{id}")]
    public ActionResult<List<Recipe>> Get(int id)
    {
      try
      {
        Recipe recipe = _rServ.GetHashCode(id);
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
    public async Task<ActionResult<Recipe>> Edit(int id, [FromBody] Recipe recipeData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        recipeData.Id = id;
        recipeData.CreatorId = userInfo.Id;
        Recipe update = _rServ.Edit(recipeData);
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
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
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