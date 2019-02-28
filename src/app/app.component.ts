import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tranings';
  constructor(private modalService: NgbModal) {

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit() {
  }
}
