USE [WordQuest]
GO

IF NOT EXISTS (SELECT TOP (1) * FROM [dbo].[Languages])
BEGIN

	SET IDENTITY_INSERT [dbo].[Languages] ON

	INSERT INTO [dbo].[Languages]
			   ([Id], [NativeName])
		 VALUES
			   (1031, 'Deutsch')
			   ,(1033, 'English')
			   ,(1034, 'Español')
			   ,(1036, 'Français')
			   ,(1040, 'Italiano')
			   ,(1049, 'Русский')

	SET IDENTITY_INSERT [dbo].[Languages] OFF

END
