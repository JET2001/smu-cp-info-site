export type Page = 'home' | 'members' | 'icpc'

const archiveUrl = 'https://archive.smujudge.com/index.html'

function activeClass(page: Page, currentPage: Page): string {
    return page === currentPage ? 'class="active"' : ''
}

export function renderNavLinks(currentPage: Page): string {
    return `
    <div class = "nav-links">
      <a ${activeClass('home', currentPage)} href="/">Home</a>
      <a ${activeClass('members', currentPage)} href="/members/">Members</a>
      <a ${activeClass('icpc', currentPage)} href="/icpc/">ICPC</a>
      <a class="archive" href="${archiveUrl}" target="_blank", rel="noopener noreferrer">Archive ↗</a>
    </div>
  `
}
export function renderHeader(currentPage: Page): string {
  return `
    <header class="site-header">
      <div class="container">
        <nav class="navbar" aria-label="Main navigation">
          <div class="brand">
            <strong>SMU CP</strong>
          </div>

          ${renderNavLinks(currentPage)}
        </nav>
      </div>
    </header>
  `
}
export function renderFooter(): string {
  return `
    <div class="container">
      <footer class="site-footer">
        <span class="footer-name">SMU CP</span>
        <span>Singapore Management University</span>
      </footer>
    </div>
  `
}