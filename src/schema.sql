USE [master]
GO
/****** Object:  Database [WordQuest]    Script Date: 02/01/2023 10:59:34 ******/
CREATE DATABASE [WordQuest]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WordQuest', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\WordQuest_Primary.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WordQuest_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\WordQuest_Primary.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [WordQuest] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WordQuest].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WordQuest] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [WordQuest] SET ANSI_NULLS ON 
GO
ALTER DATABASE [WordQuest] SET ANSI_PADDING ON 
GO
ALTER DATABASE [WordQuest] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [WordQuest] SET ARITHABORT ON 
GO
ALTER DATABASE [WordQuest] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [WordQuest] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [WordQuest] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [WordQuest] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [WordQuest] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [WordQuest] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [WordQuest] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [WordQuest] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [WordQuest] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [WordQuest] SET  DISABLE_BROKER 
GO
ALTER DATABASE [WordQuest] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [WordQuest] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [WordQuest] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [WordQuest] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [WordQuest] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [WordQuest] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [WordQuest] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [WordQuest] SET RECOVERY FULL 
GO
ALTER DATABASE [WordQuest] SET  MULTI_USER 
GO
ALTER DATABASE [WordQuest] SET PAGE_VERIFY NONE  
GO
ALTER DATABASE [WordQuest] SET DB_CHAINING OFF 
GO
ALTER DATABASE [WordQuest] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [WordQuest] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [WordQuest] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [WordQuest] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'WordQuest', N'ON'
GO
ALTER DATABASE [WordQuest] SET QUERY_STORE = OFF
GO
USE [WordQuest]
GO
/****** Object:  Table [dbo].[AlphabetFamilies]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlphabetFamilies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvariantCultureName] [varchar](20) NOT NULL,
 CONSTRAINT [PK_AlphabetFamilies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlphabetVariants]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlphabetVariants](
	[Id] [uniqueidentifier] NOT NULL,
	[LanguageId] [smallint] NOT NULL,
	[AlphabetFamilyId] [int] NOT NULL,
 CONSTRAINT [PK_AlphabetVariants] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Languages]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Languages](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[NativeName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[LanguageAlphabets]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[LanguageAlphabets]
as select /*av.Id as AlphabetVariantId,*/ lang.Id as LanguageId, lang.NativeName as LanguageNativeName, af.InvariantCultureName
from
	AlphabetVariants av
	left join Languages lang on av.LanguageId = lang.Id
	left join AlphabetFamilies af on av.AlphabetFamilyId = af.Id
GO
/****** Object:  Table [dbo].[TagNamesByLanguage]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TagNamesByLanguage](
	[TagId] [int] NOT NULL,
	[LanguageId] [smallint] NOT NULL,
	[Name] [varchar](20) NOT NULL,
 CONSTRAINT [PK_TagNamesByLanguage] PRIMARY KEY CLUSTERED 
(
	[TagId] ASC,
	[LanguageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tags]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tags](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InvariantCultureName] [varchar](25) NOT NULL,
 CONSTRAINT [PK_Tags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TagNames]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[TagNames]
as select t.Id as TagId, t.InvariantCultureName, l.Id as LanguageId, l.NativeName as NativeLanguageName, tnbl.Name as TagName
from
	Tags t
		left join TagNamesByLanguage tnbl on t.Id = tnbl.TagId
		left join Languages l on tnbl.LanguageId = l.Id
GO
/****** Object:  View [dbo].[LanguageOptions]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[LanguageOptions]
AS
SELECT        Id, NativeName
FROM            dbo.Languages
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[AlphabetVariantId] [uniqueidentifier] NOT NULL,
	[Name] [varchar](20) NOT NULL,
	[Description] [varchar](180) NULL,
	[Id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[CategoryOptions]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[CategoryOptions]
AS
SELECT        Id, AlphabetVariantId, Name, Description
FROM            dbo.Categories
GO
/****** Object:  Table [dbo].[AlphabetFamiliesLanguageNames]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlphabetFamiliesLanguageNames](
	[AlphabetFamilyId] [int] NOT NULL,
	[LanguageId] [smallint] NOT NULL,
	[Name] [varchar](20) NOT NULL,
 CONSTRAINT [PK_AlphabetFamiliesLanguageNames] PRIMARY KEY CLUSTERED 
(
	[AlphabetFamilyId] ASC,
	[LanguageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AlphabetVariant_Chars_UTF16]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlphabetVariant_Chars_UTF16](
	[AlphabetVariantId] [uniqueidentifier] NOT NULL,
	[Char] [char](1) NOT NULL,
	[IsCommon] [bit] NOT NULL,
 CONSTRAINT [PK_AlphabetVariant_Chars_UTF16] PRIMARY KEY CLUSTERED 
(
	[AlphabetVariantId] ASC,
	[Char] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoriesTags]    Script Date: 02/01/2023 10:59:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriesTags](
	[TagId] [int] NOT NULL,
	[Id] [uniqueidentifier] NOT NULL,
	[CategoryId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_CategoriesTags] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC,
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AlphabetFamilies] ON 
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (1, N'Latin')
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (2, N'Cyrillic')
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (3, N'Greek')
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (4, N'Georgian')
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (5, N'Armenian')
GO
INSERT [dbo].[AlphabetFamilies] ([Id], [InvariantCultureName]) VALUES (6, N'Hangul')
GO
SET IDENTITY_INSERT [dbo].[AlphabetFamilies] OFF
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'052f54e8-cd2d-47f2-8f8d-4886b9b6c0d9', 1031, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'150c63db-f914-469f-b1a8-166fd9db27c5', 1033, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'51e680e2-d370-48ba-871b-8883818b6c59', 1034, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'4b5ade61-0166-48d8-87c1-9c16cfe68eb5', 1036, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'60e72033-4fda-404a-96c0-2a5575501557', 1040, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'ebdfd514-f17a-43cf-8c27-3b95a2027e45', 1049, 1)
GO
INSERT [dbo].[AlphabetVariants] ([Id], [LanguageId], [AlphabetFamilyId]) VALUES (N'bcde3b82-d91a-4290-8c4d-443400fb22a6', 1049, 2)
GO
SET IDENTITY_INSERT [dbo].[Languages] ON 
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1031, N'Deutsch')
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1033, N'English')
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1034, N'Español')
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1036, N'Français')
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1040, N'Italiano')
GO
INSERT [dbo].[Languages] ([Id], [NativeName]) VALUES (1049, N'Русский')
GO
SET IDENTITY_INSERT [dbo].[Languages] OFF
GO
/****** Object:  Index [UQ_AlphabetVariants_Language_AlphabetFamily]    Script Date: 02/01/2023 10:59:34 ******/
ALTER TABLE [dbo].[AlphabetVariants] ADD  CONSTRAINT [UQ_AlphabetVariants_Language_AlphabetFamily] UNIQUE NONCLUSTERED 
(
	[LanguageId] ASC,
	[AlphabetFamilyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Languages_NativeName]    Script Date: 02/01/2023 10:59:34 ******/
ALTER TABLE [dbo].[Languages] ADD  CONSTRAINT [UQ_Languages_NativeName] UNIQUE NONCLUSTERED 
(
	[NativeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_TagNamesByLanguage]    Script Date: 02/01/2023 10:59:34 ******/
ALTER TABLE [dbo].[TagNamesByLanguage] ADD  CONSTRAINT [UQ_TagNamesByLanguage] UNIQUE NONCLUSTERED 
(
	[TagId] ASC,
	[LanguageId] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AlphabetVariant_Chars_UTF16] ADD  DEFAULT ((1)) FOR [IsCommon]
GO
ALTER TABLE [dbo].[AlphabetVariants] ADD  CONSTRAINT [DF_AlphabetVariants_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Categories] ADD  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[AlphabetFamiliesLanguageNames]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetFamiliesLanguageNames_AlphabetFamilies] FOREIGN KEY([AlphabetFamilyId])
REFERENCES [dbo].[AlphabetFamilies] ([Id])
GO
ALTER TABLE [dbo].[AlphabetFamiliesLanguageNames] CHECK CONSTRAINT [FK_AlphabetFamiliesLanguageNames_AlphabetFamilies]
GO
ALTER TABLE [dbo].[AlphabetFamiliesLanguageNames]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetFamiliesLanguageNames_Languages] FOREIGN KEY([LanguageId])
REFERENCES [dbo].[Languages] ([Id])
GO
ALTER TABLE [dbo].[AlphabetFamiliesLanguageNames] CHECK CONSTRAINT [FK_AlphabetFamiliesLanguageNames_Languages]
GO
ALTER TABLE [dbo].[AlphabetVariant_Chars_UTF16]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariant] FOREIGN KEY([AlphabetVariantId])
REFERENCES [dbo].[AlphabetVariants] ([Id])
GO
ALTER TABLE [dbo].[AlphabetVariant_Chars_UTF16] CHECK CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariant]
GO
ALTER TABLE [dbo].[AlphabetVariant_Chars_UTF16]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariants] FOREIGN KEY([AlphabetVariantId])
REFERENCES [dbo].[AlphabetVariants] ([Id])
GO
ALTER TABLE [dbo].[AlphabetVariant_Chars_UTF16] CHECK CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariants]
GO
ALTER TABLE [dbo].[AlphabetVariants]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetVariants_AlphabetFamilies] FOREIGN KEY([AlphabetFamilyId])
REFERENCES [dbo].[AlphabetFamilies] ([Id])
GO
ALTER TABLE [dbo].[AlphabetVariants] CHECK CONSTRAINT [FK_AlphabetVariants_AlphabetFamilies]
GO
ALTER TABLE [dbo].[AlphabetVariants]  WITH CHECK ADD  CONSTRAINT [FK_AlphabetVariants_Languages] FOREIGN KEY([LanguageId])
REFERENCES [dbo].[Languages] ([Id])
GO
ALTER TABLE [dbo].[AlphabetVariants] CHECK CONSTRAINT [FK_AlphabetVariants_Languages]
GO
ALTER TABLE [dbo].[Categories]  WITH CHECK ADD  CONSTRAINT [FK_Categories_AlphabetVariants] FOREIGN KEY([AlphabetVariantId])
REFERENCES [dbo].[AlphabetVariants] ([Id])
GO
ALTER TABLE [dbo].[Categories] CHECK CONSTRAINT [FK_Categories_AlphabetVariants]
GO
ALTER TABLE [dbo].[CategoriesTags]  WITH CHECK ADD  CONSTRAINT [FK_Tags] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tags] ([Id])
GO
ALTER TABLE [dbo].[CategoriesTags] CHECK CONSTRAINT [FK_Tags]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Categories"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 243
               Right = 256
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CategoryOptions'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CategoryOptions'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Languages"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 262
               Right = 382
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'LanguageOptions'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'LanguageOptions'
GO
USE [master]
GO
ALTER DATABASE [WordQuest] SET  READ_WRITE 
GO
