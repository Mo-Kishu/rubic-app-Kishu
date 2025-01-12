import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecentTradesService } from '../../services/recent-trades.service';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CROSS_CHAIN_TRADE_TYPE } from 'rubic-sdk';

@Component({
  selector: 'app-recent-crosschain-tx',
  templateUrl: './recent-crosschain-tx.component.html',
  styleUrls: ['./recent-crosschain-tx.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentCrosschainTxComponent implements OnInit {
  public readonly recentTrades = this.recentTradesService.recentTrades;

  public readonly isMobile = this.recentTradesService.isMobile;

  public readonly CROSS_CHAIN_PROVIDER = CROSS_CHAIN_TRADE_TYPE;

  constructor(
    private readonly recentTradesService: RecentTradesService,
    private readonly router: Router,
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext
  ) {}

  public ngOnInit(): void {
    this.recentTradesService.readAllTrades();
  }

  public navigateToCrossChainSwaps(): void {
    this.router.navigate(['/swaps']).then(() => this.context.completeWith(null));
  }
}
