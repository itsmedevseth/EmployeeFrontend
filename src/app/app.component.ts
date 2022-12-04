import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employee : Employee[];
  public editEmployee : Employee ;
  public deleteEmployee: Employee;

  constructor(private employeeService:EmployeeService) { }
  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (Response: Employee[]) =>{
        this.employee = Response;
      },
      (Error : HttpErrorResponse)=>{
        alert(Error.message);
      }
      );
  }

  public onAddEmloyee(addForm :NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (Response: Employee)=>{
        console.log(Response);
        this.getEmployees();
        addForm.reset()
      },
      (Error: HttpErrorResponse)=>{
        alert(Error.message);
        addForm.reset();
      },
    )

  }
  
  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  };

  public onUpdateEmloyee(employee :Employee):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (Response: Employee)=>{
        console.log(Response);
        this.getEmployees();
      },
      (Error: HttpErrorResponse)=>{
        alert(Error.message);
      },
    )

  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employee) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employee = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModal(employee: Employee, mode: string): void {
    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee =employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee =employee;
     
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
