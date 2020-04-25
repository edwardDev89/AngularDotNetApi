import { Injectable ,PipeTransform} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { MemberDetails } from '../structure/member-details.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  formData:MemberDetails
  btnName:String
  readonly rootURL = 'http://localhost:55726/Api'
  list : MemberDetails[]

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}

  postMemberInfo(){
    return this.http.post(this.rootURL+'/MemberInfo',this.formData);
  }

  updateMemberInfo(){
    return this.http.put(this.rootURL+'/MemberInfo/'+ this.formData.Id,this.formData);
  }

  deleteMemberInfo(Id){
    return this.http.delete(this.rootURL+'/MemberInfo/'+ Id);
  }

  getMemberList(){
    return this.firestore.collection('MemberDetails').snapshotChanges();
  }

  // getMemberList():Observable<MemberDetails[]>
  // {
    // this.http.get(this.rootURL+'/MemberInfo')
    // .toPromise()
    // .then(res => this.list = res as MemberDetails[]);
  //   return this.http.get<MemberDetails[]>(this.rootURL+'/MemberInfo')
  // }



}
