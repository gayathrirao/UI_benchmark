import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }
  profileData: object = {};
  ngOnInit() {
    this.http.get(environment.baseUrl+environment.api.profile).subscribe(data=>{
      console.log(data['activityName'])
      this.profileData = data['activityName'];
    });
  }


}
