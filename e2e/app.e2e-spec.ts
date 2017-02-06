import { ProjectQuyenAnhPage } from './app.po';

describe('project-quyen-anh App', function() {
  let page: ProjectQuyenAnhPage;

  beforeEach(() => {
    page = new ProjectQuyenAnhPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
