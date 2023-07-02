CREATE TABLE [dbo].[CategoriesTags] (
    [TagId]      INT              NOT NULL,
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [CategoryId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_CategoriesTags] PRIMARY KEY CLUSTERED ([CategoryId] ASC, [TagId] ASC),
    CONSTRAINT [FK_Tags] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([Id])
);



