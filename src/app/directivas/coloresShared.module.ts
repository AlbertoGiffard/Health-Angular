import { NgModule } from "@angular/core";
import { ColoresDirective } from "./colores.directive";

@NgModule({
    exports: [ColoresDirective],
    declarations: [ColoresDirective]
  })
export class coloresDirectiveSharedModule {}