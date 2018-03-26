import { WorkpackAppPage } from './app.po';

describe('workpack-app App', () => {
  let page: WorkpackAppPage;

  beforeEach(() => {
    page = new WorkpackAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
