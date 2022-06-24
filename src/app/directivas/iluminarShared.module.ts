import { NgModule } from "@angular/core";
import { IluminarDirective } from "./iluminar.directive";

@NgModule({
    exports: [IluminarDirective],
    declarations: [IluminarDirective]
  })
export class iluminarDirectiveSharedModule {}