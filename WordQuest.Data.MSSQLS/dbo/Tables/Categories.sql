CREATE TABLE [dbo].[Categories] (
    [Id]               INT           IDENTITY (1, 1) NOT NULL,
    [LanguageId]       INT           NOT NULL,
    [AlphabetFamilyId] INT           NOT NULL,
    [Name]             VARCHAR (20)  NOT NULL,
    [Description]      VARCHAR (180) NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Categories_AlphabetFamilies] FOREIGN KEY ([AlphabetFamilyId]) REFERENCES [dbo].[AlphabetFamilies] ([Id]),
    CONSTRAINT [FK_Categories_Languages] FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Languages] ([Id]),
    CONSTRAINT [UQ_Categories_Language_AlphabetFamily_Name] UNIQUE NONCLUSTERED ([LanguageId] ASC, [AlphabetFamilyId] ASC, [Name] ASC)
);

