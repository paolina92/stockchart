import {Component, OnInit}              from 'angular2/core';
import {StockService}                   from './stock.service';
import {StockChartComponent}            from './stock-chart.component';

@Component({
  selector: 'stock-table',
  template: `
    <stock-chart></stock-chart>
    <table class="table table-hover">
      <tr *ngFor="#stock of stocks">
        <td><div [style.color]="stock.color" class="label">{{stock.label}}</div></td>
        <td *ngFor="#td of stock.values">
          <div class="form-group">
            <input class="form-control" type="number" [(ngModel)]="td.val" (ngModelChange)="onChangeValue(td)" (focus)="clearTimer()" (blur)="initTimer()">
          </div>
        </td>
      </tr>
    </table>
  `,
  directives:[StockChartComponent],
  providers: [
    StockService,
    StockChartComponent
  ]
})
export class StockTableComponent implements OnInit {

  constructor (private _stockService: StockService, private _stockChartComponent: StockChartComponent) {}

  ngOnInit() {
    this._stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
      this._stockChartComponent.initChart(this.stocks);
      this.initTimer();
    });
  }

  initTimer(){
    this.timer = setInterval(() => this.refreshData(), 1000);
  }

  onChangeValue(td){
    this.td = td;
    this.td.changed = true;
    if(!isNaN(this.td.val) && this.td.val >= 0){
      this.refreshData();
    }
  }

  refreshData() {
    this._stockService.getStocks().subscribe(refreshedData => {
      for(let index in this.stocks){
        for(let item in this.stocks[index].values){
          if(!this.stocks[index].values[item].changed || isNaN(this.stocks[index].values[item].val)){
            this.stocks[index].values[item].val = refreshedData[index].values[item].val;
            this.stocks[index].values[item].changed = false;
          }
        }
      }
      this._stockChartComponent.initChart(this.stocks);
    });
  }

  clearTimer(){
    if(this.timer)
    clearInterval(this.timer);
  }
}