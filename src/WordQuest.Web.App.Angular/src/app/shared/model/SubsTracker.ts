import { Observable, PartialObserver, Subscription, isObservable } from "rxjs";
import { take } from "rxjs/operators";
import { isNilOrEmpty } from "../utils/core.utils";

export class SubsTracker {
    private _bag: Subscription | undefined = undefined;
    constructor(bag: Subscription, public readonly name?: string) {
        this._bag = bag;
    }
    public track(sub: Subscription): void;
    public track<C>(obs$: Observable<C>, observer: PartialObserver<C>): void;
    public track<C>(subOrObs$: Subscription | Observable<C>, observer?: PartialObserver<C>): void {
        if (this._bag == null)
            throw new Error('Subscriptions bag already disposed.');
        if (subOrObs$ instanceof Subscription) {
            this._bag.add(subOrObs$);
        }
        else if (isObservable(subOrObs$)) {
            const sub = subOrObs$.subscribe(observer);
            this.track(sub);
        }
    }
    private untrack(sub: Subscription): void {
        this._bag?.remove(sub);
    }
    public createChild<C>(
        destructionTrigger$: Observable<C>,
        childName?: string,
        config?: { readonly isLoggingEnabled?: boolean })
        : SubsTracker {

        const hasChildName = isNilOrEmpty(childName);
        const childSubsBag = new Subscription(hasChildName && (config?.isLoggingEnabled ?? hasChildName) ? undefined : () => {
            // logEvent(childName, `destroying subscriptions for ${childName}`);
        });
        this.track(childSubsBag);
        const childTracker = new SubsTracker(childSubsBag, childName);
        const destructionSub = destructionTrigger$.pipe(take(1)).subscribe(() => {
            this.untrack(childSubsBag);
            // logEvent(childTracker.name, 'subscriptions destruction requested');
            childSubsBag.unsubscribe();
        });
        childSubsBag.add(destructionSub);
        return childTracker;
    }
}