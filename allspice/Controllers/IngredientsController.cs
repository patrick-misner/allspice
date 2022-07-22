using System;
using System.Threading.Tasks;
using allspice.Models;
using allspice.Services;
using CodeWorks.Auth0Provider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace allspice.Controllers
{
  [ApiController]
  [Route("api/ingredients")]
  public class IngredientsController : ControllerBase
  {
    private readonly IngredientsService _iServ;

    public IngredientsController(IngredientsService iServ)
    {
      _iServ = iServ;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Ingredient>> Create([FromBody] Ingredient ingredientData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        Ingredient newIngredient = _iServ.Create(ingredientData, userInfo.Id);
        return Ok(newIngredient);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    // [HttpPut("{id}")]
    // [Authorize]
    // public async Task<ActionResult<Ingredient>> Edit(int id, [FromBody] Ingredient ingredientData)
    // {

    //   try
    //   {
    //     Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
    //     ingredientData.Id = id;
    //     Ingredient update = _iServ.Edit(ingredientData);
    //   }
    //   catch (Exception e)
    //   {
    //     return BadRequest(e.Message);
    //   }
    // }
  }
}