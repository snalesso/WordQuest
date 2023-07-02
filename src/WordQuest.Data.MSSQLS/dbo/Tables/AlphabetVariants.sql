CREATE TABLE [dbo].[AlphabetVariants] (
    [Id]               UNIQUEIDENTIFIER CONSTRAINT [DF_AlphabetVariants_Id] DEFAULT (newid()) NOT NULL,
    [LanguageId]       SMALLINT         NOT NULL,
    [AlphabetFamilyId] INT              NOT NULL,
    CONSTRAINT [PK_AlphabetVariants] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_AlphabetVariants_AlphabetFamilies] FOREIGN KEY ([AlphabetFamilyId]) REFERENCES [dbo].[AlphabetFamilies] ([Id]),
    CONSTRAINT [FK_AlphabetVariants_Languages] FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Languages] ([Id]),
    CONSTRAINT [UQ_AlphabetVariants_Language_AlphabetFamily] UNIQUE NONCLUSTERED ([LanguageId] ASC, [AlphabetFamilyId] ASC)
);



