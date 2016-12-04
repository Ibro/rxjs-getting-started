import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open('GET', url);
        xhr.send();
    }).retryWhen(retryStrategy());
}

function retryStrategy () {
    return function (errors) {
        return errors.delay(1000);
    };
}

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    })
}
//
// click.flatMap(e => load('movies.json'))
//     .subscribe(o => console.log(o));


click.flatMap(e => load('moviess.json'))
    .subscribe(renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log('complete')
    );




