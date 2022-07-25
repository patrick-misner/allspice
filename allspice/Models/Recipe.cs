namespace allspice.Models
{
  public class Recipe
  {
    public int Id { get; set; }
    public string Picture { get; set; } = "https://www.thiscatdoesnotexist.com";
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string Category { get; set; }
    public string CreatorId { get; set; }
    public Profile Creator { get; set; }
  }
}