import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, MessagesModule, NgxSpinnerModule, AutoFocusModule
  ],
  exports: [
    ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, MessagesModule, NgxSpinnerModule, AutoFocusModule
  ],

})
export class SharedModule { }
