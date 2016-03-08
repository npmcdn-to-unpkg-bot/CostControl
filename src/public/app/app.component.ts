import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';


import {BankListComponent}   from './bank/bank-list.component';
import {BankService}   from './bank/bank.service';

import {AccountListComponent}   from './account/account-list.component';

import 'rxjs/Rx';

@Component({
    selector: 'cost-control-app',
    template: `
    <h1>Cost Control</h1>
    <nav>
      <a [routerLink]="['Bank']">Bank</a>
      <a [routerLink]="['Account']">Account</a>  
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        BankService
    ]
})
@RouteConfig([
    { path: '/bank', name: 'Bank', component: BankListComponent },
    { path: '/account', name: 'Account', component: AccountListComponent }
])
export class AppComponent { }
