import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Bank}           from './bank';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class BankService {
    constructor(private http: Http) { }

    private _banksUrl = 'http://localhost:3000/api/bank';

    getBanks() {
        return this.http.get(this._banksUrl)
            .map(res => <Bank[]>res.json().data)
            .catch(this.handleError);
    }

    addBank(name: string): Observable<Bank> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._banksUrl, body, options)
            .map(res => <Bank>res.json().data)
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}