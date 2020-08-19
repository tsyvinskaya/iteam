import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor() { }

  source;
  timer: number = 0;
  tick: number = 0;
  subscribeTimer: number;
  abc;
  timerOn: boolean = false;
  pause: boolean = false;
  waitClick;


  ngOnInit(): void {
    this.source = timer(0, 1000);
  }
  observableTimer() {
    this.timer = this.tick;
    this.abc = this.source.subscribe(value => {
      this.subscribeTimer = value;
      this.tick = this.timer + this.subscribeTimer;
      this.timerOn = true;
    });
  };

  StartStopTimer() {
    if (this.timerOn === false && this.pause === false) {
      this.tick = 0;
      this.observableTimer();
    }
    else if (this.timerOn === false && this.pause === true) {
      this.observableTimer();
      this.pause = false;
    } else {
      this.abc.unsubscribe();
      this.timerOn = false;
    }
  };

  waitfunc() {
    if (this.waitClick !== undefined) {
      let secondClick = new Date();
      let t = +secondClick - (+this.waitClick);
      this.waitClick = undefined;
      if (t <= 300) { this.WaitTimer(); }
    } else {
      this.waitClick = new Date();
    }
  }

  WaitTimer() {
    this.abc.unsubscribe();
    this.timer = this.subscribeTimer;
    this.timerOn = false;
    this.pause = true;
  };

  reset() {
    this.abc.unsubscribe();
    this.tick = 0;
    this.observableTimer();
  }

}
