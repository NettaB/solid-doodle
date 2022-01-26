import { timer } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { mergeMap, switchMap, share, tap } from "rxjs/operators";
import { createErrorObservable } from "../utils";

const pollInterval = timer(0, 5000).pipe(share());

export const generateDataStream = (source) =>
  pollInterval.pipe(
    mergeMap(() => fromFetch(`http://localhost:8081/${source}`)),
    switchMap((res) => {
      if (res.ok) {
        return res.json();
      } else {
        createErrorObservable(res);
      }
    })
  );
