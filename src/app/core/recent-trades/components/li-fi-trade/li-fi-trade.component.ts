import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { RecentTradesService } from '../../services/recent-trades.service';
import { RecentTradesStoreService } from '@app/core/services/recent-trades/recent-trades-store.service';
import { UiRecentTrade } from '../../models/ui-recent-trade.interface';
import { CommonTrade } from '../../models/common-trade';
import { RecentTrade } from '@app/shared/models/my-trades/recent-trades.interface';
import { CROSS_CHAIN_TRADE_TYPE } from 'rubic-sdk';

@Component({
  selector: '[li-fi-trade]',
  templateUrl: './li-fi-trade.component.html',
  styleUrls: ['./li-fi-trade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiFiTradeComponent extends CommonTrade {
  constructor(
    private readonly recentTradesService: RecentTradesService,
    protected readonly recentTradesStoreService: RecentTradesStoreService,
    protected readonly cdr: ChangeDetectorRef,
    @Inject(TuiDestroyService) protected readonly destroy$: TuiDestroyService
  ) {
    super(recentTradesStoreService, cdr, destroy$);
  }

  public async getTradeData(trade: RecentTrade): Promise<UiRecentTrade> {
    return this.recentTradesService.getTradeData(trade, CROSS_CHAIN_TRADE_TYPE.LIFI);
  }
}