import {interval, of} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap, catchError, tap, map, switchMap } from 'rxjs/operators';

const useData = () => {
let
   const dataStream = interval(5000).pipe(
    tap(console.log),
    mergeMap(() => fromFetch('http://localhost:8081/')),
    switchMap(res => {
          if (res.ok) {
            return res.json();
          } else {
            return of({ error: true, message: `Error ${res.status}` });
          }
        })
    );

     const subscription = dataStream.subscribe({
      next: res => {console.log(res)},
      error: err => {console.error(err)}
   });
	
}