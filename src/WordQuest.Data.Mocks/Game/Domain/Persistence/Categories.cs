namespace WordQuest.Game.Domain.Persistence;

internal class Categories
{
    public static IReadOnlySet<string> English
    {
        get
        {
            return new[]
            {
                "cities",
                "animals",
                "person names",
                "elements and compounds",
                "mithology",
                "hobbies",
                "adjectives",
                "plants, flowers & fruits",
                "war weapons",
                "Pokémon",
                "Pokémon spells",
                "League of Legends' champions",
                "hobbies",
                "diseases",
                "alcoholics",
                "capitals",
                "rivers & lakes",
                "mountains & ranges",
                "sex quotes",
                "ways to die",
                "soccer players",
                "movies",
                "cartoons",
                "food brands",
                "superheroes",
                "precious gems",
                "books",
                "songs",
                "languages",
                "countries",
                "movie stars",
                "4 letters words",
                "home objects",
                "jobs",
                "singers & bands",
                "vehicles"
            }
            .ToHashSet();
        }
    }
    public static IReadOnlySet<string> Russian
    {
        get
        {
            return new[]
            {
                "города",
                "животные",
                "имена людей",
                "элементы и соединения",
                "мифология",
                "увлечения",
                "прилагательные",
                "растения цветы и фрукты",
                "боевое оружие",
                "Покемон",
                "Заклинания покемонов",
                "Чемпионы Лиги Легенд",
                "увлечения",
                "болезни",
                "алкоголики",
                "столицы",
                "реки и озера",
                "горы и хребты",
                "секс цитаты",
                "способы умереть",
                "игроки в футбол",
                "фильмы",
                "мультфильмы",
                "пищевые бренды",
                "супергерои",
                "драгоценные камни",
                "книги",
                "песни",
                "языки",
                "страны",
                "звезды телевидения",
                "слова из 4 букв",
                "домашние объекты",
                "рабочие места",
                "певцы и группы",
                "транспортные средства"
            }
            .ToHashSet();
        }
    }
    public static IReadOnlySet<string> Italian
    {
        get
        {
            return new[]
            {
                "città",
                "animali",
                "nomi di persone",
                "elementi e composti",
                "mitologia",
                "hobby",
                "aggettivi",
                "piante fiori e frutti",
                "armi da guerra",
                "Pokémon",
                "Incantesimi Pokémon",
                "I campioni di League of Legends",
                "hobby",
                "malattie",
                "alcolisti",
                "capitali",
                "fiumi e laghi",
                "montagne e catene montuose",
                "citazioni di sesso",
                "modi per morire",
                "calciatori",
                "film",
                "cartoni animati",
                "marche alimentari",
                "supereroi",
                "gemme preziose",
                "libri",
                "canzoni",
                "le lingue",
                "Paesi",
                "stelle del cinema",
                "Parole di 4 lettere",
                "oggetti domestici",
                "lavori",
                "cantanti e gruppi musicali",
                "veicoli"
            }
            .ToHashSet();
        }
    }
    public static IReadOnlySet<string> German
    {
        get
        {
            return new[]
            {
                "Städte",
                "Tiere",
                "Personennamen",
                "Elemente & Verbindungen",
                "Mithologie",
                "Hobbys",
                "Adjektive",
                "Blumen und Früchte pflanzen",
                "Kriegswaffen",
                "Pokémon",
                "Pokémon-Zauber",
                "Champions der League of Legends",
                "Hobbys",
                "Krankheiten",
                "Alkoholiker",
                "Hauptstädte",
                "Flüsse & Seen",
                "Gebirgszüge",
                "Sex-Zitate",
                "Wege zu Sterben",
                "Fußballspieler",
                "Filme",
                "Karikaturen",
                "Lebensmittelmarken",
                "Superhelden",
                "wertvolle Edelsteine",
                "Bücher",
                "Lieder",
                "Sprachen",
                "Länder",
                "Filmstars",
                "4 buchstaben wörter",
                "Heimische Gegenstände",
                "Arbeitsplätze",
                "Sänger & Bands",
                "Fahrzeuge"
            }
            .ToHashSet();
        }
    }
    public static IReadOnlySet<string> French
    {
        get
        {
            return new[]
            {
                "villes",
                "animaux",
                "noms de personne",
                "éléments & composés",
                "mithologie",
                "passe-temps",
                "adjectifs",
                "plantes fleurs & fruits",
                "armes de guerre",
                "Pokémon",
                "Sorts Pokémon",
                "Champions de League of Legends",
                "passe-temps",
                "maladies",
                "alcooliques",
                "majuscules",
                "rivières & lacs",
                "montagnes et chaînes",
                "citations de sexe",
                "façons de mourrir",
                "joueurs de football",
                "films",
                "les dessins animés",
                "marques alimentaires",
                "super-héros",
                "pierres précieuses",
                "livres",
                "Chansons",
                "langues",
                "des pays",
                "stars du cinéma",
                "mots de 4 lettres",
                "objets de la maison",
                "travaux",
                "chanteurs et groupes",
                "Véhicules"
            }
            .ToHashSet();
        }
    }
    public static IReadOnlySet<string> Spanish
    {
        get
        {
            return new[]
            {
                "ciudades",
                "animales",
                "nombres de personas",
                "elementos y compuestos",
                "mitología",
                "aficiones",
                "adjetivos",
                "plantas flores y frutas",
                "armas de guerra",
                "pokémon",
                "Hechizos Pokémon",
                "Campeones de League of Legends",
                "aficiones",
                "enfermedades",
                "alcohólicos",
                "capitales",
                "ríos y lagos",
                "montañas y cordilleras",
                "citas de sexo",
                "maneras de morir",
                "jugadores de futbol",
                "películas",
                "caricaturas",
                "marcas de alimentos",
                "superhéroes",
                "gemas preciosas",
                "libros",
                "canciones",
                "idiomas",
                "países",
                "Estrellas de cine",
                "palabras de 4 letras",
                "objetos del hogar",
                "trabajos",
                "cantantes y bandas",
                "vehículos"
            }
            .ToHashSet();
        }
    }
}