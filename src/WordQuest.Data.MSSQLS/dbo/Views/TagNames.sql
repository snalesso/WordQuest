
create view TagNames
as select t.Id as TagId, t.InvariantCultureName, l.Id as LanguageId, l.NativeName as NativeLanguageName, tnbl.Name as TagName
from
	Tags t
		left join TagNamesByLanguage tnbl on t.Id = tnbl.TagId
		left join Languages l on tnbl.LanguageId = l.Id