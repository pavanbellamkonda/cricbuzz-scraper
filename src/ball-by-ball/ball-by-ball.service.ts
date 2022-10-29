import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer';
import { cbNavSelector, somethingWentWrong } from 'src/constants';
import { PuppetService } from 'src/puppet/puppet/puppet.service';

@Injectable()
export class BallByBallService {

  constructor(private readonly puppetService: PuppetService) { }

  async getBallByBallOfMatch(cricBuzzMatchUrl: string): Promise<any> {
    const page = await this.puppetService.openPage(cricBuzzMatchUrl);
    return this.clickOnInningsButtons(page);
  }

  private async clickOnInningsButtons(page: Page) {
    const inningsBarNav = await this.puppetService.getElement(page, cbNavSelector);
    if (!inningsBarNav) throw somethingWentWrong;
    const inningsBarPills = await this.puppetService.getChildrenElements(inningsBarNav, 'div');
    if (!inningsBarPills) throw somethingWentWrong;

    inningsBarPills.shift();

    const inningsResp = [];

    for (const pill of inningsBarPills) {
      const resp = await this.getInningsCommentary(page, pill);
      inningsResp.push(resp);
      await new Promise(res => setTimeout(res, 1000))
    }
    return inningsResp;
  }

  private async getInningsCommentary(page: Page, inningsPill: ElementHandle) {
    const waitResp = page.waitForResponse(response => response.url().includes('/full-commentary/'));
    inningsPill.click();
    return (await waitResp).json();
  }
}
