import {Component, OnInit} from 'angular2/core';
import {Bank} from './bank';
import {BankService} from './bank.service';

@Component({
    template: `
    <h2>Bank's</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            </tr>
        </tbody>
    </table>`
})
export class BankListComponent implements OnInit {

    constructor(private _bankService: BankService) { }

    errorMessage: string;
    banks: Bank[];

    ngOnInit() { this.getBanks() }

    getBanks() {
        this._bankService.getBanks()
            .subscribe(
            heroes => this.banks = heroes,
            error => this.errorMessage = <any>error);
    }

    addBank(name: string) {
        if (!name) { return; }
        this._bankService.addBank(name)
            .subscribe(
            hero => this.banks.push(hero),
            error => this.errorMessage = <any>error);
    }
}

// <td *ngFor="#bank of banks">
//                 {{ bank.name }}
//                 </td>

