namespace WordQuest
{
    public class Selectable<T>
    {
        public Selectable(T value, bool isSelected)
        {
            this.Value = value;
            this.IsSelected = isSelected;
        }
        public Selectable(T value) : this(value, false) { }

        public T Value { get; set; }
        public bool IsSelected { get; set; }
    }
}
