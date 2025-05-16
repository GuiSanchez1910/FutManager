using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using futmanagerAPI.Data;
using futmanagerAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace futmanagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimesController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public TimesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddTime([FromBody] Time time)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _appDbContext.Times.Add(time);
                await _appDbContext.SaveChangesAsync();

                return Created("Time criado com sucesso!", time);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Erro ao criar time");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Time>>> GetTimes()
        {
            var times = await _appDbContext.Times.ToListAsync();

            return Ok(times);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Time>>> GetTimes(int id)
        {
            var time = await _appDbContext.Times.FindAsync(id);

            if (time == null)
            {
                return NotFound("Time não encontrado!");
            }

            return Ok(time);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Time>>> DeleteTime(int id)
        {
            var time = await _appDbContext.Times.FindAsync(id);

            if (time == null)
            {
                return NotFound("Time não encontrado!");
            }

            _appDbContext.Remove(time);

            await _appDbContext.SaveChangesAsync();

            return Ok("Time removido com sucesso");
        }

        [HttpPut("id")]
        public async Task<IActionResult> UpdateTime(int id, [FromBody] Time timeAtualizado)
        {
            var timeExistente = await _appDbContext.Times.FindAsync(id);

            if (timeExistente == null)
            {
                return NotFound("Time não encontrado!");
            }

            timeExistente.Nome = timeAtualizado.Nome;
            timeExistente.Historia = timeAtualizado.Historia;
            timeExistente.Estadio = timeAtualizado.Estadio;
            timeExistente.Cor = timeAtualizado.Cor;
            timeExistente.Escudo = timeAtualizado.Escudo;
            timeExistente.Hino = timeAtualizado.Hino;
            timeExistente.Pais = timeAtualizado.Pais;

            await _appDbContext.SaveChangesAsync();

            return Ok("Time atualizado com sucesso");
        }
    }

    
}