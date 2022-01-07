CREATE TABLE [dbo].[AlphabetVariant_Chars_UTF16] (
    [AlphabetVariantId] INT      NOT NULL,
    [CharCode]          SMALLINT NOT NULL,
    [IsCommon]          BIT      DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_AlphabetVariant_Chars_UTF16] PRIMARY KEY CLUSTERED ([AlphabetVariantId] ASC, [CharCode] ASC),
    CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariant] FOREIGN KEY ([AlphabetVariantId]) REFERENCES [dbo].[AlphabetVariants] ([Id])
);

