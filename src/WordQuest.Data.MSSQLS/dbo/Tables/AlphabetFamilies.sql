CREATE TABLE [dbo].[AlphabetFamilies] (
    [Id]                   INT          IDENTITY (1, 1) NOT NULL,
    [InvariantCultureName] VARCHAR (20) NOT NULL,
    CONSTRAINT [PK_AlphabetFamilies] PRIMARY KEY CLUSTERED ([Id] ASC)
);

