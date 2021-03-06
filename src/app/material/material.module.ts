import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import {
  MatDatepickerModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatListModule,
  MatStepperModule,
  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatTableModule,
  
  
  


  }from '@angular/material';

@NgModule({
  imports: [
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule
   


   
  ],
  exports: [
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule
    
   

  ]
})
export class MaterialModule { }
