import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Router} from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  Cards: any=[];
  user= new User();
  username: string;
  name: string;
  email: string;

  constructor(
    private router: Router,
    private apiService:ApiService

    ) {
    this.readCard();
    this.getUser();

    }

  ngOnInit(): void {
  }

  readCard() {
    this.apiService.getCards().subscribe((data) =>{
      this.Cards=data;
    });
  }

  getUser(){

    if (this.apiService.getCurrentuser().userName== null){
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

  edit(index){
    let id=this.Cards[index]._id;
    this.router.navigate(['/card-edit/:'+ id]);
  }

}
