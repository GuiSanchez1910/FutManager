using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace futmanagerAPI.Models
{
    public class Time
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string Historia { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string Estadio { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string Cor { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string Escudo { get; set; }
    }
}
