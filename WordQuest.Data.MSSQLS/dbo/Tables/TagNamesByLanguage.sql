CREATE TABLE [dbo].[TagNamesByLanguage] (
    [TagId]      INT          NOT NULL,
    [LanguageId] INT          NOT NULL,
    [Name]       VARCHAR (20) NOT NULL,
    CONSTRAINT [PK_TagNamesByLanguage] PRIMARY KEY CLUSTERED ([TagId] ASC, [LanguageId] ASC),
    CONSTRAINT [UQ_TagNamesByLanguage] UNIQUE NONCLUSTERED ([TagId] ASC, [LanguageId] ASC, [Name] ASC)
);

