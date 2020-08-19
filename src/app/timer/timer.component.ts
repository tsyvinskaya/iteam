import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';

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
  hh: number = 0;
  mm: number = 0;
  ss: number = 0;


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


  timeMask(tt, tick) {
    tt = Math.floor(tick / 60);
    if (tt < 10) {
      return "0" + tt
    }
    else {
      return tt;
    }
  };


  sec(ss, tick) {
    ss = tick;
    if (tick < 10) {
      ss = tick;
      return "0" + ss
    }
    else if (tick > 59) {
      ss = tick - (60 * (Math.floor(tick / 60)));
      if (ss >= 10) { return ss } else { return "0" + ss }
    }
    else {
      return ss;
    }
  };

}
