CREATE TABLE [dbo].[Tags] (
    [Id]                   INT          IDENTITY (1, 1) NOT NULL,
    [InvariantCultureName] VARCHAR (25) NOT NULL,
    CONSTRAINT [PK_Tags] PRIMARY KEY CLUSTERED ([Id] ASC)
);

