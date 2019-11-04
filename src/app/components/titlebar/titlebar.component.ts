import {Component, OnInit} from '@angular/core';
import {WindowService} from '../../services/window.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitleBarComponent implements OnInit {
  hasTitleBar = true;
  title = 'Test Window';
  hasTab = true;
  resizable = true;
  icon = 'locationPin';
  iconArray = [
    'alarm', 'bin', 'catalogue_over', 'catalogue', 'catalogues_over',
    'catalogues', 'clipboard', 'clock', 'cloud', 'cog_over', 'cog',
    'company_over', 'company', 'computer', 'contacts_over', 'contacts',
    'content_area', 'creditcard', 'dashboard_over', 'dashboard', 'diary_over',
    'diary', 'downArrow', 'download', 'duplicate_page', 'email',
    'exclamation_mark_circle', 'external_link', 'eye', 'fat_close', 'fat_tick',
    'folder', 'forms', 'formsResponses', 'framework', 'funnel_over', 'funnel',
    'ghost_over', 'ghost', 'globe', 'home_over', 'home', 'leftArrow',
    'leftArrowStart', 'link', 'locationPin', 'lock_closed', 'lock_open',
    'media', 'menu_over', 'menu', 'messages_over', 'messages', 'minus',
    'move', 'orders_over', 'orders', 'page_add', 'page_settings', 'page_tags',
    'pages', 'pencil', 'phone_over', 'phone', 'piechart_over', 'piechart',
    'playbutton', 'plus', 'print_over', 'print', 'question_mark_circle',
    'question_mark', 'quotations_over', 'quotations', 'reminder_over',
    'reminder', 'reorder', 'rightArrow', 'rightArrowEnd', 'save', 'search_over',
    'search', 'styles', 'tasks_over', 'tasks', 'templates', 'tree_corner',
    'tree_line_horizontal', 'tree_line', 'tree_t', 'upArrow', 'users_over',
    'users', 'world', 'oceanworks', 'minimise', 'restore', 'maximise', 'close'];

  primary = '#337799';
  primaryLight = '#438eb5';
  text = '#c1c1c1';
  backgroundColor = '#1d1d1d';
  backgroundGrey = '#282828';
  backgroundMidGrey = '#6c6c6c';
  backgroundDarkerGrey = '#353535';
  boxShadow = 'none';

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this.windowService.new(this.getIcon(), true, 'No Tab', false, true);
    this.windowService.new(this.getIcon(), true, 'Not Resizable', true, false);
    this.windowService.new(this.getIcon(), false, 'No Title Bar', true, true);
    this.windowService.new(this.getIcon(), true, 'Test Window 4', true, true);
    this.windowService.new(this.getIcon(), true, 'Test Window 5', true, true);
  }

  getIcon() {
    return this.iconArray[Math.floor(Math.random() * this.iconArray.length)];
  }

  toggleCompusoft() {
    // document.body.classList.add('noTransition');
    document.body.classList.contains('compusoft') ? document.body.classList.remove('compusoft') : document.body.classList.add('compusoft');
    // setTimeout(() => {
    //   document.body.classList.remove('noTransition');
    // });
  }

  addWindow() {
    this.windowService.new(
      this.icon,
      JSON.parse(String(this.hasTitleBar)),
      this.title,
      JSON.parse(String(this.hasTab)),
      JSON.parse(String(this.resizable))
    );
  }

  closeAllWindows() {
    this.windowService.closeAll();
  }

  setTheme() {
    document.documentElement.style
      .setProperty('--primary', this.primary);
    document.documentElement.style
      .setProperty('--primary-light', this.primaryLight);
    document.documentElement.style
      .setProperty('--text', this.text);
    document.documentElement.style
      .setProperty('--background-color', this.backgroundColor);
    document.documentElement.style
      .setProperty('--background-grey', this.backgroundGrey);
    document.documentElement.style
      .setProperty('--background-mid-grey', this.backgroundMidGrey);
    document.documentElement.style
      .setProperty('--background-darker-grey', this.backgroundDarkerGrey);
    document.documentElement.style
      .setProperty('--box-shadow', this.boxShadow);
  }

  revertTheme() {
    document.documentElement.style
      .removeProperty('--primary');
    document.documentElement.style
      .removeProperty('--primary-light');
    document.documentElement.style
      .removeProperty('--text');
    document.documentElement.style
      .removeProperty('--background-color');
    document.documentElement.style
      .removeProperty('--background-grey');
    document.documentElement.style
      .removeProperty('--background-mid-grey');
    document.documentElement.style
      .removeProperty('--background-darker-grey');
    document.documentElement.style
      .removeProperty('--box-shadow');
  }
}
