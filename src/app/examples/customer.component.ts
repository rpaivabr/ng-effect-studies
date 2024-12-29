import { ChangeDetectionStrategy, Component, effect, inject, input, numberAttribute } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [ ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup">
      <input formControlName="id" />
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CustomerComponent {
  // sync forms
  id = input.required({ transform: numberAttribute });

  formGroup = inject(NonNullableFormBuilder).group({
    id: [0, Validators.required]
  });

  formUpdate = effect(() => {
    const id = this.id();
    const isEdit = !isNaN(id);

    if (isEdit) {
      this.formGroup.setValue({ id });
    }
  })

}
