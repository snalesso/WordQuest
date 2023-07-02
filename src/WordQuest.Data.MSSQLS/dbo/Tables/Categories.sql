CREATE TABLE [dbo].[Categories] (
    [AlphabetVariantId] UNIQUEIDENTIFIER NOT NULL,
    [Name]              VARCHAR (20)     NOT NULL,
    [Description]       VARCHAR (180)    NULL,
    [Id]                UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Categories_AlphabetVariants] FOREIGN KEY ([AlphabetVariantId]) REFERENCES [dbo].[AlphabetVariants] ([Id])
);



