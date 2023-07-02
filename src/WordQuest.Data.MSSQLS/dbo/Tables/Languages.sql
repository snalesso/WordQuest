CREATE TABLE [dbo].[Languages] (
    [Id]         SMALLINT      IDENTITY (1, 1) NOT NULL,
    [NativeName] NVARCHAR (50) NULL,
    CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UQ_Languages_NativeName] UNIQUE NONCLUSTERED ([NativeName] ASC)
);



