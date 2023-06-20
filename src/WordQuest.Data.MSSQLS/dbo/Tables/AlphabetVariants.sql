CREATE TABLE [dbo].[AlphabetVariants] (
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [LanguageId] INT NOT NULL,
    [NativeName] VARCHAR(20) NULL, 
    [Description] VARCHAR(180) NULL, 
    CONSTRAINT [PK_AlphabetVariants] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [FK_AlphabetVariants_Languages] FOREIGN KEY ([LanguageId]) REFERENCES [dbo].[Languages] ([Id]),
    CONSTRAINT [UQ_AlphabetVariants_NativeName] UNIQUE NONCLUSTERED ([NativeName])
);

