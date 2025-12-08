import { Injectable, signal } from '@angular/core';
import { Expense } from '../models/expense.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseSignal = signal<Expense[]>([]);

  constructor(private http: HttpClient) { }


  //GET ALL EXPENSES
  getExpenses() {
    this.http.get<Expense[]>('http://localhost:3000/expenses')
    .subscribe(expenses => this.expenseSignal.set(expenses));  
  }

  get expenses() {
    return this.expenseSignal.asReadonly();
  }


  //ADD EXPENSE
  addExpense(expense: Expense){
    this.http.post('http://localhost:3000/expenses', expense)
    .subscribe(() => this.getExpenses());
  }

  //DELETE EXPENSE
  deleteExpense(id: number){
    this.http.delete(`http://localhost:3000/expenses/${id}`)
    .subscribe(() => this.getExpenses());
  }

  //UPDATE EXPENSE
  updateExpense(id : number, updatedExpense: Expense){
    this.http.put(`http://localhost:3000/expenses/${id}`, updatedExpense)
    .subscribe(() => this.getExpenses());
  }

  //Get Expense by ID
  getExpenseById(id: number) {
    return this.expenseSignal().find(expense => expense.id == id);
  }

}
