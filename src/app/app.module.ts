import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/components/main-page.component';
import { ProductPageComponent } from './product-page/components/product-page.component';
import { CartPageComponent } from './cart-page/components/cart-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { QuillModule } from "ngx-quill";
import { AuthInterceptorService } from "./shared/services/auth-interceptor.service";
import { ProductComponent } from './product/components/product.component';

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        MainPageComponent,
        ProductPageComponent,
        CartPageComponent,
        ProductComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        QuillModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptorService
        }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
