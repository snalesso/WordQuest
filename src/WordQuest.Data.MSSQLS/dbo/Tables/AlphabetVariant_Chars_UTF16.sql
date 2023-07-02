CREATE TABLE [dbo].[AlphabetVariant_Chars_UTF16] (
    [AlphabetVariantId] UNIQUEIDENTIFIER NOT NULL,
    [Char]              CHAR (1)         NOT NULL,
    [IsCommon]          BIT              NOT NULL,
    CONSTRAINT [PK_AlphabetVariant_Chars_UTF16] PRIMARY KEY CLUSTERED ([AlphabetVariantId] ASC, [Char] ASC),
    CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariant] FOREIGN KEY ([AlphabetVariantId]) REFERENCES [dbo].[AlphabetVariants] ([Id]),
    CONSTRAINT [FK_AlphabetVariant_Chars_UTF16_AlphabetVariants] FOREIGN KEY ([AlphabetVariantId]) REFERENCES [dbo].[AlphabetVariants] ([Id])
);



