import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WindowComponent } from './components/window/window.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { JsonPipe } from './pipes/json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    DesktopComponent,
    ToolbarComponent,
    TitlebarComponent,
    PrettyPrintPipe,
    JsonPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
