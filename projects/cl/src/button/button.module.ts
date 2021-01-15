import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { ClButton } from './button.component';



@NgModule({
  declarations: [ClButton],
  imports: [
    MatRippleModule, MatCommonModule
  ],
  exports: [ClButton, MatCommonModule]
})
export class ButtonModule { }
