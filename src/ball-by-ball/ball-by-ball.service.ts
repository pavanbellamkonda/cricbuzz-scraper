import { Injectable } from '@nestjs/common';
import { ElementHandle, Page } from 'puppeteer';
import { cbInnsNavSelector, cbNavSelector, somethingWentWrong, fullCommentaryText } from 'src/constants';
import { PuppetService } from 'src/puppet/puppet/puppet.service';
import { delay } from 'src/utils';

@Injectable()
export class BallByBallService {

  constructor(private readonly puppetService: PuppetService) { }

  async getBallByBallOfMatch(cricBuzzMatchUrl: string): Promise<any> {
    const page = await this.puppetService.openPage(cricBuzzMatchUrl);
    return this.getFullCommentary(page);
  }

  private async getFullCommentary(page) {
    await this.clickOnFullcommentary(page);
    return this.clickOnInningsButtons(page);
  }

  private async clickOnFullcommentary(page: Page) {
    const tabNav = await this.puppetService.getElement(page, cbNavSelector);
    if (!tabNav) throw somethingWentWrong;
    const tabs = await this.puppetService.getChildrenElements(tabNav, 'a');
    if (!tabs) throw somethingWentWrong;

    let isFullCommentaryActive = false;
    let fullCommentaryTab: ElementHandle;
    for (const tabEle of tabs) {
      const text = await tabEle.evaluate(el => el.textContent);
      if (text.trim() === fullCommentaryText) {
        fullCommentaryTab = tabEle;
        const cssClasses = await tabEle.evaluate(el => el.className);
        if (cssClasses.includes('active')) {
          isFullCommentaryActive = true;
        }
        break;
      }
    }

    if (!fullCommentaryTab) throw somethingWentWrong;
    if (!isFullCommentaryActive) {
      await fullCommentaryTab.click();
      await this.puppetService.waitForPageLoad(page);
    }
  }

  private async clickOnInningsButtons(page: Page) {
    const inningsBarNav = await this.puppetService.getElement(page, cbInnsNavSelector);
    if (!inningsBarNav) throw somethingWentWrong;
    const inningsBarPills = await this.puppetService.getChildrenElements(inningsBarNav, 'div');
    if (!inningsBarPills) throw somethingWentWrong;

    inningsBarPills.shift();

    const inningsResp = [];

    for (const pill of inningsBarPills) {
      const resp = await this.getInningsCommentary(page, pill);
      inningsResp.push(resp);
      await delay(1000);
    }
    return inningsResp;
  }

  private async getInningsCommentary(page: Page, inningsPill: ElementHandle) {
    const waitResp = page.waitForResponse(response => response.url().includes('/full-commentary/'));
    await inningsPill.click();
    return (await waitResp).json();
  }
}
