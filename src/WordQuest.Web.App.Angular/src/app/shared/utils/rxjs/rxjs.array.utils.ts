import { Observable, of } from "rxjs";

export function ofEmptyReadonlyArray<T>() {
  return of([] as ReadonlyArray<T>);
}

export function ofEmptyArray<T>() {
  return of([] as Array<T>);
}

export function asReadOnlyArray() {
  return <T>(source$: Observable<T[]>) =>
    source$ as Observable<readonly T[]>;
}

export function asEditableArray() {
  return <T>(source$: Observable<ReadonlyArray<T>>) =>
    source$ as Observable<Array<T>>;
}

export type ItemReplacement<T> = [oldItem: T, newItem: T];
export const ImmutableArrayHandlers = {
  getItemsChangedHandler: <T>(newItems: readonly T[]) => {
    return (oldItems: readonly T[]) => {
      if (newItems == null)
        throw new Error('New items list not defined.');
      return newItems;
    };
  },
  getAppendItemsHandler: <T>(itemsToAppend: readonly T[]) => {
    return (sourceItems: readonly T[]) => {
      if (itemsToAppend == null)
        throw new Error('Items to append list not defined.');
      return itemsToAppend.length > 0
        ? [...sourceItems, ...itemsToAppend]
        : sourceItems;
    }
  },
  getRemoveItemHandler: <T>(itemToRemove: T) => {
    return (sourceItems: readonly T[]) => {
      if (itemToRemove == null)
        throw new Error('Item to remove not defined.');
      const i = sourceItems.indexOf(itemToRemove);
      return i !== -1
        ? [...sourceItems.slice(0, i), ...sourceItems.slice(i + 1, sourceItems.length)]
        : sourceItems;
    };
  },
  getRemoveItemsHandler: <T>(itemsToRemove: readonly T[]) => {
    return (sourceItems: readonly T[]) => {
      if (itemsToRemove == null)
        throw new Error('Items to remove list not defined.');
      if (itemsToRemove.length <= 0)
        return sourceItems;
      return sourceItems.filter(item => !itemsToRemove.includes(item))
    };
  },
  getReplaceItemByReplHandler: <T>(replacement: readonly [oldItem: T, newItem: T]) => {
    return (sourceItems: readonly T[]) => {
      if (replacement == null)
        throw new Error('Replacement not defined.');
      if (replacement.length !== 2 || replacement[0] == null || replacement[1] == null)
        throw new Error('Bad replacement format.');
      const [oldItem, newItem] = replacement;
      const i = sourceItems.indexOf(oldItem);
      return i !== -1
        ? [...sourceItems.slice(0, i), newItem, ...sourceItems.slice(i + 1, sourceItems.length)]
        : sourceItems;
    };
  },
  getReplaceItemsHandler: <T>(replacements: readonly ItemReplacement<T>[]) => {
    return (sourceItems: readonly T[]) => {
      if (replacements == null)
        throw new Error('Replacements list not defined.');

      const newItems: T[] = [];
      const remainingReplacements: ItemReplacement<T>[] = [...replacements];
      for (const sourceItem of sourceItems) {
        let nextItem = sourceItem;
        const replCount = remainingReplacements.length;
        for (let replIdx = 0; replIdx < replCount; replIdx++) {
          const replacement = replacements[replIdx];
          if (replacement == null)
            throw new Error('Replacement not defined.');
          if (replacement.length !== 2 || replacement[0] == null || replacement[1] == null)
            throw new Error('Bad replacement format.');
          const [oldItem, newItem] = replacement;

          if (oldItem !== nextItem)
            continue;

          nextItem = newItem;
          remainingReplacements.splice(replIdx, 1);
        }
        newItems.push(nextItem);
      }

      if (remainingReplacements.length > 0)
        throw new Error(`${remainingReplacements.length} replacements had no match.`);

      return newItems as readonly T[];
    };
  }
}

export const MutableArrayHandlers = {
  getItemsChangedHandler: <T>(newItems: T[]) => {
    return () => {
      return newItems;
    };
  },
  getAppendItemsHandler: <T>(itemsToAppend: readonly T[]) => {
    return (items: T[]) => {
      if (items == null)
        throw new Error('Items to append not defined');
      items.push(...itemsToAppend);
      return items;
    };
  },
  getRemoveItemHandler: <T>(itemToRemove: T) => {
    return (items: T[]) => {
      if (itemToRemove == null)
        throw new Error('Item to remove not defined');
      const i = items.indexOf(itemToRemove);
      if (i < 0)
        throw new Error('Item to remove is not included');
      items.splice(i, 1);
      return items;
    };
  },
  getRemoveItemsHandler: <T>(itemsToRemove: readonly T[]) => {
    return (items: T[]) => {
      if (itemsToRemove == null)
        throw new Error('Items to remove not defined');
      for (const itemToRemove of itemsToRemove) {
        if (itemToRemove == null)
          throw new Error('Item to remove not defined');
        const i = items.indexOf(itemToRemove);
        if (i < 0)
          throw new Error('Item to remove is not included');
        items.splice(i, 1);
      }
      return items;
    };
  },
  getReplaceItemHandler: <T>(oldItem: T, newItem: T) => {
    return (items: T[]) => {
      if (oldItem == null)
        throw new Error('Item to replace not defined');
      if (newItem == null)
        throw new Error('Item to use as replacement not defined');
      const i = items.indexOf(oldItem);
      if (i < 0)
        throw new Error('Item to replace is not included');
      if (items.includes(newItem))
        throw new Error('Item to use as replacement is already included');
      items[i] = newItem;
      return items;
    };
  }
}