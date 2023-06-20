begin transaction;

begin try

	drop view CategoryOptions;
	drop view LanguageAlphabets;
	drop view LanguageOptions;
	drop view TagNames;

	drop table TagNamesByLanguage;
	drop table CategoriesTags;
	drop table Categories;
	drop table Tags;
	drop table AlphabetVariant_Chars_UTF16;
	drop table AlphabetFamiliesLanguageNames;
	drop table AlphabetVariants;
	drop table AlphabetFamilies;
	drop table Languages;

	commit transaction;

end try
begin catch
	rollback transaction;
end catch
