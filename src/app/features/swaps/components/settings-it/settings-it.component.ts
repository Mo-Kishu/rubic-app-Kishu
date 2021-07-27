import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ItSettingsForm,
  SettingsService
} from 'src/app/features/swaps/services/settings-service/settings.service';
import { AbstractControl, FormControl, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'app-settings-it',
  templateUrl: './settings-it.component.html',
  styleUrls: ['./settings-it.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsItComponent implements OnInit {
  public instantTradeForm: FormGroup<ItSettingsForm>;

  constructor(private readonly settingsService: SettingsService) {}

  public ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    const form = this.settingsService.settingsForm.controls.INSTANT_TRADE;
    this.instantTradeForm = new FormGroup<ItSettingsForm>({
      autoSlippageTolerance: new FormControl<boolean>(form.value.autoSlippageTolerance),
      slippageTolerance: new FormControl<number>(form.value.slippageTolerance),
      deadline: new FormControl<number>(form.value.deadline),
      disableMultihops: new FormControl<boolean>(form.value.disableMultihops),
      rubicOptimisation: new FormControl<boolean>(form.value.rubicOptimisation),
      autoRefresh: new FormControl<boolean>(form.value.autoRefresh)
    });
    this.setFormChanges(form);
  }

  private setFormChanges(form: AbstractControl<ItSettingsForm>): void {
    this.instantTradeForm.valueChanges.subscribe(settings => {
      form.patchValue({ ...settings });
    });
    form.valueChanges.subscribe(settings => {
      this.instantTradeForm.patchValue({ ...settings }, { emitEvent: false });
    });
  }

  public setAutoSlippageTolerance(value: boolean): void {
    this.instantTradeForm.patchValue({
      autoSlippageTolerance: value
    });
  }
}
