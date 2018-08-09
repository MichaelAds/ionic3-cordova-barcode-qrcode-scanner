import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  
  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
    var promise = Promise.resolve().then(function(){
      console.log('rejection');
      throw new Error('Failed');
    });
    promise['catch'](function(){console.log('caught')});
  }

  getProducts(){
    return this.http.get('assets/data/products.json')
      .map((response:Response)=>response.json());
  }
  

}
