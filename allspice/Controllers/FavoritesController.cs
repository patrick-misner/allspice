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
  [Route("api/favorites")]
  public class FavoritesController : ControllerBase
  {
    private readonly FavoritesService _fServ;

    public FavoritesController(FavoritesService fServ)
    {
      _fServ = fServ;
    }

    [HttpPost]
    [Authorize]

    public async Task<ActionResult<Favorite>> Create([FromBody] Favorite favoriteData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        favoriteData.AccountId = userInfo.Id;
        Favorite newFavorite = _fServ.Create(favoriteData);
        return Ok(newFavorite);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}