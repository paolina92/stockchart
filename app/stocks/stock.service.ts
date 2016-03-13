import {Injectable}       from 'angular2/core';
import {Http, Response}   from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StockService {

  constructor (private http: Http) {}

  private _stocksUrl = 'http://127.0.0.1:8000?count=20';

  getStocks () {
    return this.http.get(this._stocksUrl).map(res => this._createStockArray(res.json());
  }

  _createStockArray(data) {
    let colors = ['#3fb0ac','#3b3a36','green','blue'];
    let stockArray = []
    let labels = this._getStockLabel(data);
    for(let i in labels){
      let label = labels[i];
      let color = colors[i]
      stockArray.push({"label":label, "color":color, "values":[]});
      for(let item in data){
        let val = parseFloat(data[item].stocks[label].toPrecision(3).split("e-")[0]);
        stockArray[i].values.push({"val":val,"changed":false});
      }
    }
    return stockArray;
  }

  _getStockLabel(data){
    let labelArray = [];
    for(let item in data){
      let indexKey = Object.keys(data[item].stocks);
      for(let i in indexKey){
        labelArray.push(indexKey[i]);
      }
    }
    return labelArray.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    });
  }
}