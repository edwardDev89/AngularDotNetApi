import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/member.service';
import { NgForm, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  constructor(
    private service: MemberService,
    private toastrservice : ToastrService,
    private firestore : AngularFirestore

  ) { }

  ngOnInit() {
     this.service.btnName ='Submit'
     this.resetForm();
  }

  onSubmit(form:NgForm){

    let data = Object.assign({}, form.value);
    delete data.Id;

    if(form.value.Id == null)
    {
      this.firestore.collection('MemberDetails').add(data).then(
        res=>{
          this.toastrservice.success("Submitted Successfully!","Member Registration");
          this.resetForm(form);
        },
        err=>{
          this.toastrservice.error(err,"Member Registration");
        }
      );
    }
    else
    {
      this.firestore.doc('MemberDetails/'+form.value.Id).update(data).then(
        res=>{
          this.toastrservice.success("Updated Successfully!","Member Registration");
          this.resetForm(form);
        },
        err=>{
          this.toastrservice.error(err,"Member Registration");
        }
      );
    }

  }


  resetForm(form?: NgForm) {
    if (form != null)
    {
      form.resetForm();
    }

    this.service.formData = {
      Id: null,
      IC:'',
      Name: '',
      Age: '',
      Weight: '',
      Height: '',
      BodyFat:''
    }
  }
  
}



// WebCore way


//onSubmit(form:NgForm){

    // if(this.service.formData.Id == 0){
    //   this.insertRecord(form);
    // }
    // else
    // {
    //   this.updateRecord(form);
    // }

//}

// insertRecord(form:NgForm){
//   this.service.postMemberInfo().subscribe(
//     res=>{
//       this.resetForm(form);
//       this.toastrservice.success("Submitted Successfully!","Member Registration");
//       this.service.getMemberList();
//     },
//     err=>{
//       this.toastrservice.error(err,"Member Registration")
//     }
//   );
// }

// updateRecord(form:NgForm){
//   this.service.updateMemberInfo().subscribe(
//     res=>{
//       this.toastrservice.success("Updated Successfully!","Member Registration");
//       this.service.getMemberList();
//     },
//      err=>{
//       this.toastrservice.error(err,"Member Registration")
//     }
//   )
// }
