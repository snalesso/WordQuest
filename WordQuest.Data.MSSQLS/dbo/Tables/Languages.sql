CREATE TABLE [dbo].[Languages] (
    [Id]         INT          IDENTITY (1, 1) NOT NULL,
    [NativeName] VARCHAR (20) NOT NULL,
    CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED ([Id] ASC)
);

