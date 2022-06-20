import { NgModule } from "@angular/core";
import { SiDirective } from './si.directive';

@NgModule({
    exports: [SiDirective],
    declarations: [SiDirective]
  })
export class siSharedModule {}