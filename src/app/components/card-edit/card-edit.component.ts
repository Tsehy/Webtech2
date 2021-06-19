import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

  user= new User();
  username: string;
  name: string;
  email: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
    this.getUser();
  }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;

  createForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  selectedCard = new Card();

  ngOnInit(): void {
    let id = this.router.url.toString();
    id = id.replace('/card-edit/:','');
    this.apiService.getCard(id).subscribe(
      (card) => {
        this.selectedCard = card;
      }
    )
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      name: [''],
      cost: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.valid) {
      let id = this.router.url.toString();
      id = id.replace('/card-edit/:','');

      this.apiService.updateCard(id,this.createForm.value).subscribe(
        (res) => {
          console.log('Card updated successfully!');
          this.ngZone.run(() => this.router.navigateByUrl('/card-list'));
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      return false;
    }
  }

  onDelete() {
    if (this.createForm.valid) {
      let id = this.router.url.toString();
      id = id.replace('/card-edit/:','');

      this.apiService.deleteCard(id).subscribe(
        (res) => {
          console.log('Card deleted successfully!');
          this.ngZone.run(() => this.router.navigateByUrl('/card-list'));
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  getUser(){
    if (this.apiService.getCurrentuser().userName == null){
      this.router.navigate(['/login']);
    }

    this.user=this.apiService.getCurrentuser();
    this.name= JSON.stringify(this.user.name)
    this.username= JSON.stringify(this.user.userName)
    this.email= JSON.stringify(this.user.email)
  }

  logout(){
    this.user= new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
  }

}
