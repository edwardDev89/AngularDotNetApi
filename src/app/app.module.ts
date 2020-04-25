import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MemberService } from './shared/member.service';

import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberComponent } from './member/member.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import{AngularFireModule} from '@angular/fire';
import{AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MemberDetailsComponent,
    MemberListComponent,
    MemberComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
