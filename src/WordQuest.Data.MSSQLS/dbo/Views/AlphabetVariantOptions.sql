create view AlphabetVariantOptions as
select
	alpVar.Id
	, alpVar.NativeName
	, alpVar.Description
	, alpVar.LanguageId
	, lang.NativeName LanguageNativeName
from
	AlphabetVariants alpVar
inner join
	Languages lang
		on	lang.Id = alpVar.LanguageId