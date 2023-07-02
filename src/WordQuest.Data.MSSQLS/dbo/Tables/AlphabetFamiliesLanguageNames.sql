CREATE TABLE [dbo].[AlphabetFamiliesLanguageNames] (
    [AlphabetFamilyId] INT          NOT NULL,
    [LanguageId]       SMALLINT     NOT NULL,
    [Name]             VARCHAR (20) NOT NULL,
    CONSTRAINT [PK_AlphabetFamiliesLanguageNames] PRIMARY KEY CLUSTERED ([AlphabetFamilyId] ASC, [LanguageId] ASC),
    CONSTRAINT [FK_AlphabetFamiliesLanguageNames_AlphabetFamilies] FOREIGN KEY ([AlphabetFamilyId]) REFERENCES [dbo].[AlphabetFamilies] ([Id]),
    CONSTRAINT [FK_AlphabetFamiliesLanguageNames_Languages] FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Languages] ([Id])
);



