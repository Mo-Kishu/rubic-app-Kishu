import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { OrderBookTradePageRoutingModule } from './order-book-trade-page-routing.module';
import { OrderBookTradeComponent } from './components/order-book-trade/order-book-trade.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderBookTradeService } from './services/order-book-trade.service';
import { WithdrawButtonComponent } from './components/withdraw-button/withdraw-button.component';
import { OperationInProgressModalComponent } from './components/operation-in-progress-modal/operation-in-progress-modal.component';
import { OperationCompletedModalComponent } from './components/operation-success-modal/operation-completed-modal.component';
import { CancelCompletedModalComponent } from './components/cancel-completed-modal/cancel-completed-modal.component';
import { TokenFormComponent } from './components/token-form/token-form.component';

@NgModule({
  declarations: [
    OrderBookTradeComponent,
    WithdrawButtonComponent,
    OperationInProgressModalComponent,
    OperationCompletedModalComponent,
    CancelCompletedModalComponent,
    TokenFormComponent
  ],
  imports: [
    CommonModule,
    OrderBookTradePageRoutingModule,
    SharedModule,
    ClipboardModule,
    FormsModule
  ],
  providers: [OrderBookTradeService]
})
export class OrderBookTradePageModule {}