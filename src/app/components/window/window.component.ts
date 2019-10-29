import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {WindowModel} from '../../models/window-model';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {
  resizeDirection: any;
  innerWidth: number;
  innerHeight: number;
  resizeWindowItem: any = null;

  @Input() windowItem: WindowModel;
  @Input() windowList;
  @Input() zIndex;
  @Output() closing = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    this.resizeDragGo(event);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event) {
    this.resizeDragStop(event);
  }

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
  }

  closeWindow(event, windowItem: WindowModel) {
    event.stopPropagation();
    windowItem.closing = true;
    // @ts-ignore
    this.closing.emit(windowItem);
  }

  closedWindow(windowItem) {
    if (windowItem.class === 'closed') {
      this.closed.emit(windowItem);
    }
  }

  resizeCursorSet(event: MouseEvent) {


    // @ts-ignore
    if (!event.target.classList.contains('windowItem')) {
      return false;
    }

    if (
      this.resizeWindowItem === null
    ) {
      const xOff = event.offsetX;
      const yOff = event.offsetY;
      const resizeCornerSize = 100;
      this.resizeDirection = '';

      if (yOff <= resizeCornerSize) {
        this.resizeDirection += 'n';
      } else {
        if (
          // @ts-ignore
          yOff >= event.target.offsetHeight - resizeCornerSize) {
          this.resizeDirection += 's';
        }
      }

      if (xOff <= resizeCornerSize) {
        this.resizeDirection += 'w';
      } else {
        if (
          // @ts-ignore
          xOff >= event.target.offsetWidth - resizeCornerSize) {
          this.resizeDirection += 'e';
        }
      }

      document.body.style.cursor = this.resizeDirection + '-resize';
    } else {
      this.resizeCursorRestore();
    }
  }

  resizeCursorRestore() {
    document.body.style.cursor = '';
  }

  resizeDragStart(event: MouseEvent, windowItem: WindowModel) {
    // @ts-ignore
    if (!event.target.classList.contains('windowItem')) {
      return false;
    }
    this.resizeWindowItem = windowItem;

    this.resizeWindowItem.entities.xPosition = event.x || event.pageX;
    this.resizeWindowItem.entities.yPosition = event.y || event.pageY;

    this.resizeWindowItem.entities.oldLeft = parseInt(this.resizeWindowItem.left, 10);
    this.resizeWindowItem.entities.oldTop = parseInt(this.resizeWindowItem.top, 10);
    this.resizeWindowItem.entities.oldWidth = parseInt(this.resizeWindowItem.width, 10);
    this.resizeWindowItem.entities.oldHeight = parseInt(this.resizeWindowItem.height, 10);
  }

  resizeDragGo(event) {
    if (this.resizeWindowItem !== null) {
      this.makeWindowActive(this.resizeWindowItem);

      let north = false;
      let south = false;
      let east = false;
      let west = false;
      if (this.resizeDirection.charAt(0) === 'n') {
        north = true;
      }
      if (this.resizeDirection.charAt(0) === 's') {
        south = true;
      }
      if (this.resizeDirection.charAt(0) === 'e' || this.resizeDirection.charAt(1) === 'e') {
        east = true;
      }
      if (this.resizeDirection.charAt(0) === 'w' || this.resizeDirection.charAt(1) === 'w') {
        west = true;
      }

      let x = event.pageX;
      let y = event.pageY;

      if (x <= 3) {
        x = 3;
      }

      if (x >= this.innerWidth - 3) {
        x = this.innerWidth - 3;
      }

      if (y <= 0) {
        y = 0;
      }

      if (y >= this.innerHeight - 3) {
        y = this.innerHeight - 3;
      }

      let dx = x - this.resizeWindowItem.entities.xPosition;
      let dy = y - this.resizeWindowItem.entities.yPosition;

      if (west) {
        dx = -dx;
      }
      if (north) {
        dy = -dy;
      }

      let w = this.resizeWindowItem.entities.oldWidth + dx;
      let h = this.resizeWindowItem.entities.oldHeight + dy;
      if (w <= this.resizeWindowItem.entities.minimumWidth) {
        w = this.resizeWindowItem.entities.minimumWidth;
        dx = w - this.resizeWindowItem.entities.oldWidth;
      }
      if (h <= this.resizeWindowItem.entities.minimumHeight) {
        h = this.resizeWindowItem.entities.minimumHeight;
        dy = h - this.resizeWindowItem.entities.oldHeight;
      }

      if (north || east || south || west) {
        this.resizeWindowItem.class = 'open active noTransition';
      }

      if (east || west) {
        this.resizeWindowItem.width = w;
      }
      if (north || south) {
        this.resizeWindowItem.height = h;
      }

      if (west) {
        this.resizeWindowItem.left = (this.resizeWindowItem.entities.oldLeft - dx);
      }
      if (north) {
        this.resizeWindowItem.top = (this.resizeWindowItem.entities.oldTop - dy);
      }
    }
  }

  resizeDragStop(event) {
    if (this.resizeWindowItem !== null) {
      this.resizeWindowItem.entities = {};
      this.resizeWindowItem = null;
    }
    document.body.style.cursor = '';
  }

  makeWindowActive(windowItem: WindowModel) {
    this.zIndex++;
    // tslint:disable-next-line:forin
    for (const key in this.windowList) {
      this.windowList[key].state.active = false;
      this.windowList[key].class = 'open ' +
        (this.windowList[key].state.isMaximised ? ' maximised' : '') +
        (this.windowList[key].state.isMinimised ? ' minimised' : '');
    }

    windowItem.zIndex = this.zIndex;
    windowItem.state.active = true;
    windowItem.class = 'open active' +
      (windowItem.state.isMaximised ? ' maximised' : '') +
      (windowItem.state.isMinimised ? ' minimised' : '');

  }

  maximiseWindow($event: MouseEvent, windowItem: WindowModel) {
    windowItem.state.isMaximised = !windowItem.state.isMaximised;
  }

  minimiseWindow($event: MouseEvent, windowItem: WindowModel) {
    windowItem.state.isMinimised = !windowItem.state.isMinimised;
  }
}
