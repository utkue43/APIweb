using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngPro.Infrastructure.Operations
{
    public static class NameOperation
    {
        public static string CharacterRegulatory(string name)
        {
            string[] unwantedChars = {"/", "!", "'", "^" /* ..................*/};
            foreach (var ch in unwantedChars)
            {
                name = name.Replace(ch, "");
            }
            return name;
        }







    }
}
