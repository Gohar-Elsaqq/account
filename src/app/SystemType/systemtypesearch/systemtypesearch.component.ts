import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-systemtypesearch',
  templateUrl: './systemtypesearch.component.html',
  styleUrls: ['./systemtypesearch.component.css']
})
export class SystemtypesearchComponent {
  constructor(private appService: AppServices, private router: Router, private route: ActivatedRoute) { }
  systemType: any[] = [];
  lookupType: string = '';
  errormsg = false;
   ifSaved = false;


  ngOnInit(): void {
    this.getAllType();
  }

  getAllType() {
    this.appService.getAllType().subscribe(
      (responseData: any) => {
        this.systemType = responseData;
      },
      (error: any) => {
        console.error('Error fetching apartment data:', error);
      }
    );
  }

  onDelete(lookupType: any) {
    if (this.lookupType===null) {
      this.errormsg = true;
      this.ifSaved = false;
      console.log("Not Valid");
      setTimeout(() => {
        this.errormsg = false;
      }, 4000);
      return;
    }
    this.appService.deletesystemType(lookupType).subscribe(
      response => {
        this.ifSaved = true;
        this.errormsg = false;
        setTimeout(() => {
          this.ifSaved = false;
        }, 4000);
        this.systemType = this.systemType.filter(item => item.lookupType !== lookupType);
      },
       
      error => {
        this.errormsg = true;
      }
    );
  }
}