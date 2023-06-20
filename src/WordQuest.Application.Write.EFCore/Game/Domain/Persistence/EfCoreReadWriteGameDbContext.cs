using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreReadWriteGameDbContext : DbContext
{
    public EfCoreReadWriteGameDbContext()
    {
    }

    public EfCoreReadWriteGameDbContext(DbContextOptions<EfCoreReadWriteGameDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; set; }

    public virtual DbSet<AlphabetFamily> AlphabetFamilies { get; set; }

    public virtual DbSet<AlphabetVariant> AlphabetVariants { get; set; }

    public virtual DbSet<AlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; set; }

    public virtual DbSet<CategoriesTag> CategoriesTags { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CategoryOption> CategoryOptions { get; set; }

    public virtual DbSet<Language> Languages { get; set; }

    public virtual DbSet<LanguageAlphabet> LanguageAlphabets { get; set; }

    public virtual DbSet<LanguageOption> LanguageOptions { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<TagName> TagNames { get; set; }

    public virtual DbSet<TagNamesByLanguage> TagNamesByLanguages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AlphabetFamiliesLanguageName>(entity =>
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

        modelBuilder.Entity<AlphabetFamily>(entity =>
        {
            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AlphabetVariant>(entity =>
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

        modelBuilder.Entity<AlphabetVariantCharsUtf16>(entity =>
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

        modelBuilder.Entity<CategoriesTag>(entity =>
        {
            entity.HasKey(e => new { e.CategoryId, e.TagId });

            entity.HasOne(d => d.Tag).WithMany(p => p.CategoriesTags)
                .HasForeignKey(d => d.TagId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tags");
        });

        modelBuilder.Entity<Category>(entity =>
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

        modelBuilder.Entity<CategoryOption>(entity =>
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

        modelBuilder.Entity<Language>(entity =>
        {
            entity.HasIndex(e => e.NativeName, "UQ_Languages_NativeName").IsUnique();

            entity.Property(e => e.NativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<LanguageAlphabet>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("LanguageAlphabets");

            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.LanguageNativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<LanguageOption>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("LanguageOptions");

            entity.Property(e => e.Id).ValueGeneratedOnAdd();
            entity.Property(e => e.NativeName).HasMaxLength(50);
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.Property(e => e.InvariantCultureName)
                .HasMaxLength(25)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TagName>(entity =>
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

        modelBuilder.Entity<TagNamesByLanguage>(entity =>
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
