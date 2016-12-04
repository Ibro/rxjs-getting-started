import { Observable } from 'rxjs';

// import {Observable} from "rxjs/Observable";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/filter";

let numbers = [1, 5, 10];
let source = Observable.create(observer => {
    for(let n of numbers) {
        observer.next(n);
    }

    observer.complete();

});


source.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);




