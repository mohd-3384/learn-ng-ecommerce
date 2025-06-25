import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, MessagesModule, ToastModule, NgxSpinnerModule, AutoFocusModule
  ],
  exports: [
    ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, MessagesModule, ToastModule, NgxSpinnerModule, AutoFocusModule
  ],
  providers: [MessageService]

})
export class SharedModule { }
