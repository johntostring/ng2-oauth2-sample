import { Ng2Oauth2SamplePage } from './app.po';

describe('ng2-oauth2-sample App', function() {
  let page: Ng2Oauth2SamplePage;

  beforeEach(() => {
    page = new Ng2Oauth2SamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
