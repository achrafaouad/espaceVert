import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-helper-cardconponent',
  templateUrl: './helper-cardconponent.component.html',
  styleUrls: ['./helper-cardconponent.component.scss']
})
export class HelperCardconponentComponent {
  @Input() color: string;
  @Input() title: string;
  @Input() sub: string;
  @Input() icon: string;
  @Input() val: string;
  @Input() perc: string;
  @Input() ecart: string;

}
