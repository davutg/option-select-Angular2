import {
    Injectable
}
from 'angular2/core';
import {
    Http, Response
}
from 'angular2/http';

import {
    Observable
}
from 'rxjs/Observable';

import {
    Option
}
from './option';

@
Injectable()
export class OptionService {
    constructor(private http: Http) {}
    public sourceAddress: string;
    public getOptions(): Observable < Response > {
        return this.http.get(this.sourceAddress);
            //.map(this.onLoaded);
            //.catch(this.handleError);
    }

    private onLoaded(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: Response | any) {

    }
}