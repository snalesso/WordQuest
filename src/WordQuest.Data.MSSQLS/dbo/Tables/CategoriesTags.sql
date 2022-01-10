CREATE TABLE [dbo].[CategoriesTags] (
    [CategoryId] INT IDENTITY (1, 1) NOT NULL,
    [TagId]      INT NOT NULL,
    CONSTRAINT [PK_CategoriesTags] PRIMARY KEY CLUSTERED ([CategoryId] ASC, [TagId] ASC),
    CONSTRAINT [FK_Categories] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Categories] ([Id]),
    CONSTRAINT [FK_Tags] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([Id])
);

