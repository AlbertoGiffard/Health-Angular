import { NgModule } from "@angular/core";
import { ColoresDirective } from "./colores.directive";
import { SiDirective } from './si.directive';

@NgModule({
    exports: [ColoresDirective],
    declarations: [ColoresDirective]
  })
export class coloresDirectiveSharedModule {}