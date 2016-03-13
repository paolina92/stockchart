import {Component} 						from 'angular2/core';
import {HTTP_PROVIDERS}    				from 'angular2/http';
import {StockTableComponent}			from './stocks/stock-table.component';

@Component({
	selector: 'stock-app',
	template: `
		<stock-table></stock-table>
	`,
	directives:[StockTableComponent],
	providers: [
		HTTP_PROVIDERS
	]
})
export class AppComponent {}