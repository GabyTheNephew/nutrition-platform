import { Component, input } from '@angular/core';

@Component({
  selector: 'app-medical-disclaimer',
  standalone: true,
  imports: [],
  templateUrl: './medical-disclaimer.component.html',
  styleUrl: './medical-disclaimer.component.scss'
})
export class MedicalDisclaimerComponent {
  compact = input<boolean>(false);
}