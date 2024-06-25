import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-aparment',
  templateUrl: './add-aparment.component.html',
  styleUrls: ['./add-aparment.component.css']
})
export class AddAparmentComponent {

  constructor( private router: Router){}
}
