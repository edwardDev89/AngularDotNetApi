import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(
    private service:MemberService
  ) { }

  ngOnInit() {
  }

}
