import { NgModule } from '@angular/core';
//import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
