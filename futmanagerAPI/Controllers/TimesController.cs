using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using futmanagerAPI.Data;
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
    }
}