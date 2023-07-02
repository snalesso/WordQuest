USE [WordQuest]
GO

IF NOT EXISTS (SELECT TOP (1) * FROM [dbo].[AlphabetFamilies])
BEGIN

	INSERT INTO [dbo].[AlphabetFamilies]
			   ([Id], InvariantCultureName)
		 VALUES
			   ('Latin')
			   ,('Cirillic')

END
