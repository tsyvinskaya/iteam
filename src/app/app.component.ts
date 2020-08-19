import { Component } from '@angular/core';
import {clearTimeout,setInterval,setTimeout} from 'timers';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Iteam';
}
