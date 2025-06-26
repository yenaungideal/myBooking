import { Component } from '@angular/core';
import { MixingTemplateComponent } from '../mixing-template/mixing-template.component';
import { SamplePackComponent } from '../sample-pack/sample-pack.component';

@Component({
  selector: 'app-dashboard',
  imports: [MixingTemplateComponent, SamplePackComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
