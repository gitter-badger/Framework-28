import {Component, HostListener, OnInit} from '@angular/core';
import {WindowModel} from '../../models/window-model';
import {WindowComponent} from '../window/window.component';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  windowList = {};
  objectKeys = Object.keys;
  top = 100; // calculate the title bar height TODO
  left: number;
  zIndex = 1;
  innerWidth: number;
  innerHeight: number; // minus tabbar height again TODO

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor() {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.buildWindows();
  }

  buildWindows() {
    this.addWindow('Init test window A');
    this.addWindow('Init test window B');
    this.addWindow('Init test window C');
    this.addWindow('Init test window D');
    this.addWindow('Init test window E');
  }

  onClose(windowItem: WindowModel) {
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        this.windowList[key].class = 'closed';
      }
    }
  }

  onClosed(windowItem: WindowModel) {
    let lastWindow: WindowModel;
    let windowActive = false;
    for (const key in this.windowList) {
      if (windowItem === this.windowList[key]) {
        delete this.windowList[key];
      } else {
        lastWindow = this.windowList[key];
        if (lastWindow.state.active) {
          windowActive = true;
        }
      }
    }

    if (typeof lastWindow !== 'undefined') {
      if (lastWindow.class !== 'closed' && !windowActive) {
        this.makeWindowActive(lastWindow);
      }
    }
  }

  logIt() {
    console.log(this.windowList);
  }

  addWindow(title) {
    let id = 0;

    for (const key in this.windowList) {
      if (parseInt(key, 10) >= id) {
        id = parseInt(key, 10);
      }
    }
    id++;

    const height = this.randomIntFromInterval(200, 400);
    const width = this.randomIntFromInterval(400, 800);

    const position = this.findXYPosition(height, width);

    let windowItem: WindowModel;
    windowItem = {
      titleBar: title + ' ' + id,
      body: 'testing',
      class: 'new active',
      zIndex: this.zIndex,
      top: position.top,
      left: position.left,
      height,
      width,
      minimumWidth: 300,
      minimumHeight: 200,
      maximizable: true,
      minimizable: true,
      resizable: true,
      closing: false,
      entities: {},
      state: {
        active: true,
        isMinimised: false,
        isMaximised: false
      }
    };

    this.windowList[id] = windowItem;
    setTimeout(() => {
      this.windowList[id].class = 'open';
      this.makeWindowActive(windowItem);
    });

    this.zIndex += 1;
  }

  findXYPosition(height, width) {
    const grid = 30;
    let rows = 0;

    for (let left = 0; (left + width) < this.innerWidth; left += grid) {
      for (let top = 100; (top + height) < this.innerHeight; top += grid) {

        if (!this.isWindowAtPosition(top, left)) {
          return {top, left};
        }

        if (left + grid + width > this.innerWidth) {
          left = 0;
          rows++;
          top = 100 + (rows * grid);
        } else {
          left += grid;
        }
      }
    }

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isWindowAtPosition(top, left) {
    for (const item in this.windowList) {
      if (this.windowList[item].top === top && this.windowList[item].left === left) {
        return true;
      }
    }
    return false;
  }

  closeWindowById(id: number) {
    if (typeof this.windowList[id] !== 'undefined') {
      this.windowList[id].class = 'closed';
    }
  }

  closeAllWindows() {
    for (const key in this.windowList) {
      if (typeof this.windowList[key] !== 'undefined') {
        this.windowList[key].class = 'closed';
      }
    }
  }

  makeWindowActive(windowItem: WindowModel) {
    this.zIndex++;
    for (const key in this.windowList) {
      if (this.windowList[key] === windowItem) {

        this.windowList[key].state.active = true;
        this.windowList[key].zIndex = this.zIndex;
        this.windowList[key].class = 'open active' +
          (this.windowList[key].state.isMaximised ? ' maximised' : '') +
          (this.windowList[key].state.isMinimised ? ' minimised' : '');
      } else {
        this.windowList[key].state.active = false;
        this.windowList[key].class = 'open' +
          (this.windowList[key].state.isMaximised ? ' maximised' : '') +
          (this.windowList[key].state.isMinimised ? ' minimised' : '');
      }
    }
  }

  maximiseWindow(windowItem: WindowModel) {

    console.log(this.windowList);
  }

  minimiseWindow(windowItem: WindowModel) {

    console.log(this.windowList);
  }
}
