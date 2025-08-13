using futmanagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace futmanagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Time> Times { get; set; }
    }
}