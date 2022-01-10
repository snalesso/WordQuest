using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WordQuest.Game.Persistence.Models;

namespace WordQuest.Game.Persistence
{
    public partial class WordQuestDBContext : DbContext
    {
        internal WordQuestDBContext()
        {
        }

        internal WordQuestDBContext(DbContextOptions<WordQuestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; set; } = null!;
        public virtual DbSet<AlphabetFamily> AlphabetFamilies { get; set; } = null!;
        public virtual DbSet<AlphabetVariant> AlphabetVariants { get; set; } = null!;
        public virtual DbSet<AlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Language> Languages { get; set; } = null!;
        public virtual DbSet<LanguageAlphabet> LanguageAlphabets { get; set; } = null!;
        public virtual DbSet<Tag> Tags { get; set; } = null!;
        public virtual DbSet<TagName> TagNames { get; set; } = null!;
        public virtual DbSet<TagNamesByLanguage> TagNamesByLanguages { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // TODO: hide info
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=WordQuest;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AlphabetFamiliesLanguageName>(entity =>
            {
                entity.HasKey(e => new { e.AlphabetFamilyId, e.LanguageId });

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.AlphabetFamily)
                    .WithMany(p => p.AlphabetFamiliesLanguageNames)
                    .HasForeignKey(d => d.AlphabetFamilyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlphabetFamiliesLanguageNames_AlphabetFamilies");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.AlphabetFamiliesLanguageNames)
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
                entity.HasIndex(e => new { e.LanguageId, e.AlphabetFamilyId }, "UQ_AlphabetVariants_Language_AlphabetFamily")
                    .IsUnique();

                entity.HasOne(d => d.AlphabetFamily)
                    .WithMany(p => p.AlphabetVariants)
                    .HasForeignKey(d => d.AlphabetFamilyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlphabetVariants_AlphabetFamilies");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.AlphabetVariants)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlphabetVariants_Languages");
            });

            modelBuilder.Entity<AlphabetVariantCharsUtf16>(entity =>
            {
                entity.HasKey(e => new { e.AlphabetVariantId, e.CharCode });

                entity.ToTable("AlphabetVariant_Chars_UTF16");

                entity.Property(e => e.IsCommon)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.AlphabetVariant)
                    .WithMany(p => p.AlphabetVariantCharsUtf16s)
                    .HasForeignKey(d => d.AlphabetVariantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AlphabetVariant_Chars_UTF16_AlphabetVariant");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => new { e.LanguageId, e.AlphabetFamilyId, e.Name }, "UQ_Categories_Language_AlphabetFamily_Name")
                    .IsUnique();

                entity.Property(e => e.Description)
                    .HasMaxLength(180)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.AlphabetFamily)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.AlphabetFamilyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Categories_AlphabetFamilies");

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Categories_Languages");

                entity.HasMany(d => d.Tags)
                    .WithMany(p => p.Categories)
                    .UsingEntity<Dictionary<string, object>>(
                        "CategoriesTag",
                        l => l.HasOne<Tag>().WithMany().HasForeignKey("TagId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Tags"),
                        r => r.HasOne<Category>().WithMany().HasForeignKey("CategoryId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Categories"),
                        j =>
                        {
                            j.HasKey("CategoryId", "TagId");

                            j.ToTable("CategoriesTags");

                            j.IndexerProperty<int>("CategoryId").ValueGeneratedOnAdd();
                        });
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.Property(e => e.NativeName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LanguageAlphabet>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("LanguageAlphabets");

                entity.Property(e => e.InvariantCultureName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.LanguageNativeName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.Property(e => e.InvariantCultureName)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TagName>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("TagNames");

                entity.Property(e => e.InvariantCultureName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.NativeLanguageName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TagName1)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("TagName");
            });

            modelBuilder.Entity<TagNamesByLanguage>(entity =>
            {
                entity.HasKey(e => new { e.TagId, e.LanguageId });

                entity.ToTable("TagNamesByLanguage");

                entity.HasIndex(e => new { e.TagId, e.LanguageId, e.Name }, "UQ_TagNamesByLanguage")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
