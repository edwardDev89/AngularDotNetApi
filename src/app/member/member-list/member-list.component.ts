import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { MemberDetails } from 'src/app/structure/member-details.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})

export class MemberListComponent implements OnInit {

  listData: MemberDetails[]
  page = 1;
  pageSize = 4;
  collectionSize = 10;

  constructor(
    private service: MemberService,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
     this.getMemberList();
  }

  populateForm(memberdetail: MemberDetails) {
    this.service.btnName = 'Update';
    this.service.formData = Object.assign({}, memberdetail);
  }

  onDelete(id) {
      if (confirm("Are you sure to delete this record?")) {
        this.firestore.doc('MemberDetails/'+id).delete().then(
          res => {
            this.service.getMemberList();
            this.toastr.warning("Delete Successfully!", "Member Detail Registration")
          },
          err => {
            this.toastr.error("Delete Failed!", "Member Detail Registration")
          }
        )
      }
    }

  getMemberList(){
    this.service.getMemberList().subscribe(
      (res)=>{
        this.listData = res.map(
          item=>{
            return{
              Id:item.payload.doc.id,
              ...item.payload.doc.data()
            } as MemberDetails
          }
        )
      });
  }



  get memberList() {
    return this.listData.map((list, i) => ({id: i + 1, ...list})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }




}


//WebCore way

  // onDelete(id) {
  //   if (confirm("Are you sure to delete this record?")) {
  //     this.service.deleteMemberInfo(id).subscribe(
  //       res => {
  //         this.service.getMemberList();
  //         this.toastr.warning("Delete Successfully!", "Member Detail Registration")
  //       },
  //       err => {
  //         this.toastr.error("Delete Failed!", "Member Detail Registration")
  //       }
  //     )
  //   }
  // }
