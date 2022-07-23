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
  [Route("api/steps")]
  public class StepsController : ControllerBase
  {
    private readonly StepsService _stServ;

    public StepsController(StepsService stServ)
    {
      _stServ = stServ;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Step>> Create([FromBody] Step stepData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        Step newStep = _stServ.Create(stepData, userInfo.Id);
        return Ok(newStep);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpGet("{id}")]
    public ActionResult<Step> Get(int id)
    {
      try
      {
        Step step = _stServ.Get(id);
        return Ok(step);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<Step>> EditAsync(int id, [FromBody] Step stepData)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        stepData.Id = id;
        Step update = _stServ.Edit(stepData, userInfo.Id);
        return Ok(update);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<Step>> DeleteAsync(int id)
    {
      try
      {
        Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
        Step deletedStep = _stServ.Delete(id, userInfo.Id);
        return Ok(deletedStep);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}