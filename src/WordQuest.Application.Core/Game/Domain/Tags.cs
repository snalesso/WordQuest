namespace WordQuest.Game.Domain;

[Flags]
public enum Tags : short
{
    Geography = 1 << 0,
    Science = 1 << 1,
    History = 1 << 2,
    Technology = 1 << 3,
    Social = 1 << 4,
    Entertainment = 1 << 5,
    Other = 1 << 6,
}