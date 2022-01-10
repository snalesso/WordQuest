
create view LanguageAlphabets
as select /*av.Id as AlphabetVariantId,*/ lang.Id as LanguageId, lang.NativeName as LanguageNativeName, af.InvariantCultureName
from
	AlphabetVariants av
	left join Languages lang on av.LanguageId = lang.Id
	left join AlphabetFamilies af on av.AlphabetFamilyId = af.Id