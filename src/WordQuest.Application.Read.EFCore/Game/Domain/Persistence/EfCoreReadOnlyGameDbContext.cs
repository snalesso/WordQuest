using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreReadOnlyGameDbContext : DbContext
{
    public EfCoreReadOnlyGameDbContext(DbContextOptions<EfCoreReadOnlyGameDbContext> options)
        : base(options)
    {
    }
    public override void Dispose()
    {
        base.Dispose();
    }

    public override ValueTask DisposeAsync()
    {
        return base.DisposeAsync();
    }

    public virtual DbSet<EfCoreAlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; set; }
    public virtual DbSet<EfCoreAlphabetFamily> AlphabetFamilies { get; set; }
    public virtual DbSet<EfCoreAlphabetVariant> AlphabetVariants { get; set; }
    public virtual DbSet<EfCoreAlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; set; }
    public virtual DbSet<EfCoreCategoriesTag> CategoriesTags { get; set; }
    public virtual DbSet<EfCoreCategory> Categories { get; set; }
    public virtual DbSet<EfCoreCategoryOption> CategoryOptions { get; set; }
    public virtual DbSet<EfCoreLanguage> Languages { get; set; }
    public virtual DbSet<EfCoreLanguageAlphabet> LanguageAlphabets { get; set; }
    public virtual DbSet<EfCoreLanguageOption> LanguageOptions { get; set; }
    public virtual DbSet<EfCoreTag> Tags { get; set; }
    public virtual DbSet<EfCoreTagName> TagNames { get; set; }
    public virtual DbSet<EfCoreTagNamesByLanguage> TagNamesByLanguages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var cs = optionsBuilder.Options.FindExtension<SqlServerOptionsExtension>()?.ConnectionString;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EfCoreAlphabetFamiliesLanguageName>(entity =>
        {
            entity.HasKey(e => new { e.AlphabetFamilyId, e.LanguageId });

            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.AlphabetFamily).WithMany(p => p.AlphabetFamiliesLanguageNames)
                .HasForeignKey(d => d.AlphabetFamilyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlphabetFamiliesLanguageNames_AlphabetFamilies");

            entity.HasOne(d => d.Language).WithMany(p => p.AlphabetFamiliesLanguageNames)
                .HasForeignKey(d => d.LanguageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlphabetFamiliesLanguageNames_Languages");
        });

        modelBuilder.Entity<EfCoreAlphabetFamily>(entity =>
        {
            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EfCoreAlphabetVariant>(entity =>
        {
            entity.HasIndex(e => new { e.LanguageId, e.AlphabetFamilyId }, "UQ_AlphabetVariants_Language_AlphabetFamily").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

            entity.HasOne(d => d.AlphabetFamily).WithMany(p => p.AlphabetVariants)
                .HasForeignKey(d => d.AlphabetFamilyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlphabetVariants_AlphabetFamilies");

            entity.HasOne(d => d.Language).WithMany(p => p.AlphabetVariants)
                .HasForeignKey(d => d.LanguageId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlphabetVariants_Languages");
        });

        modelBuilder.Entity<EfCoreAlphabetVariantCharsUtf16>(entity =>
        {
            entity.HasKey(e => new { e.AlphabetVariantId, e.Char });

            entity.ToTable("AlphabetVariant_Chars_UTF16");

            entity.Property(e => e.Char)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.IsCommon)
                .IsRequired()
                .HasDefaultValueSql("((1))");

            entity.HasOne(d => d.AlphabetVariant).WithMany(p => p.AlphabetVariantCharsUtf16s)
                .HasForeignKey(d => d.AlphabetVariantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AlphabetVariant_Chars_UTF16_AlphabetVariant");
        });

        modelBuilder.Entity<EfCoreCategoriesTag>(entity =>
        {
            entity.HasKey(e => new { e.CategoryId, e.TagId });

            entity.HasOne(d => d.Tag).WithMany(p => p.CategoriesTags)
                .HasForeignKey(d => d.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tags");
        });

        modelBuilder.Entity<EfCoreCategory>(entity =>
        {
            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Description)
                .HasMaxLength(180)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.AlphabetVariant).WithMany(p => p.Categories)
                .HasForeignKey(d => d.AlphabetVariantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Categories_AlphabetVariants");
        });

        modelBuilder.Entity<EfCoreCategoryOption>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("CategoryOptions");

            entity.Property(e => e.Description)
                .HasMaxLength(180)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EfCoreLanguage>(entity =>
        {
            entity.HasIndex(e => e.NativeName, "UQ_Languages_NativeName").IsUnique();

            entity.Property(e => e.NativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<EfCoreLanguageAlphabet>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("LanguageAlphabets");

            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LanguageNativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<EfCoreLanguageOption>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("LanguageOptions");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.NativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<EfCoreTag>(entity =>
        {
            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(25)
                .IsUnicode(false);
        });

        modelBuilder.Entity<EfCoreTagName>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("TagNames");

            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.NativeLanguageName).HasMaxLength(50);
            entity.Property(e => e.TagName1)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("TagName");
        });

        modelBuilder.Entity<EfCoreTagNamesByLanguage>(entity =>
        {
            entity.HasKey(e => new { e.TagId, e.LanguageId });

            entity.ToTable("TagNamesByLanguage");

            entity.HasIndex(e => new { e.TagId, e.LanguageId, e.Name }, "UQ_TagNamesByLanguage").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
