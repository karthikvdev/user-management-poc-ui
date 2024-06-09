import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationComponent } from './components/integration/integration.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
    { path: '', pathMatch: "prefix", component: IntegrationComponent },
    { path: 'view', component: FormComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
