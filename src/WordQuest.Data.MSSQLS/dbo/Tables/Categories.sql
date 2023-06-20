CREATE TABLE [dbo].[Categories] (
    [Id]                UNIQUEIDENTIFIER    NOT NULL,
    [AlphabetVariantId] UNIQUEIDENTIFIER    NOT NULL,
    [Name]              VARCHAR (20)        NOT NULL,
    [Description]       VARCHAR (180)       NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id]),
    CONSTRAINT [FK_Categories_AlphabetVariants] FOREIGN KEY ([AlphabetVariantId]) REFERENCES [dbo].[AlphabetVariants] ([Id])
);

