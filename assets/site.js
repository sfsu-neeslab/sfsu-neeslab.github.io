class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') || '';
    const links = [
      ['research', '/research.html', 'Research'],
      ['people', '/people.html', 'People'],
      ['publications', '/publications.html', 'Publications'],
      ['news', '/news.html', 'News'],
      ['join', '/join.html', 'Join us']
    ];
    this.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="institution-bar">
        <div class="container">
          <a href="https://www.sfsu.edu/">San Francisco State University</a>
          <span>School of Engineering</span>
        </div>
      </div>
      <header class="site-header">
        <div class="container nav-shell">
          <a class="brand" href="/" aria-label="NEES Lab home">
            <img class="brand-logo" src="/images/nees-logo.png" alt="" aria-hidden="true">
            <span class="brand-wordmark"><span class="brand-name"><span class="brand-ne">NE</span><span class="brand-es">ES</span> LAB</span><span class="brand-full">NeuroEngineering and Embedded Systems Laboratory</span></span>
          </a>
          <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-navigation">Menu</button>
          <nav class="site-nav" id="site-navigation" aria-label="Main navigation">
            ${links.map(([id, href, label]) => `<a href="${href}" ${page === id ? 'aria-current="page"' : ''} class="${id === 'join' ? 'nav-join' : ''}">${label}</a>`).join('')}
          </nav>
        </div>
      </header>`;
    const button = this.querySelector('.menu-button');
    const nav = this.querySelector('.site-nav');
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div><div class="footer-brand">NEES Lab</div><p>NeuroEngineering and Embedded Systems Laboratory<br>San Francisco State University</p></div>
            <div><div class="footer-heading">Explore</div><ul class="footer-links"><li><a href="/research.html">Research</a></li><li><a href="/people.html">People</a></li><li><a href="/publications.html">Publications</a></li><li><a href="/news.html">News</a></li></ul></div>
            <div><div class="footer-heading">Connect</div><ul class="footer-links"><li><a href="/join.html">Join the lab</a></li><li><a href="/contact.html">Contact</a></li><li><a href="https://engineering.sfsu.edu/">School of Engineering</a></li><li><a href="https://github.com/sfsu-neeslab">GitHub</a></li></ul></div>
          </div>
          <div class="footer-bottom"><span>&copy; ${new Date().getFullYear()} NEES Lab, San Francisco State University</span><span>Built for accessibility, speed, and long-term stewardship.</span></div>
        </div>
      </footer>`;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

document.addEventListener('click', (event) => {
  const filter = event.target.closest('[data-filter]');
  if (!filter) return;
  document.querySelectorAll('[data-filter]').forEach(button => button.classList.remove('active'));
  filter.classList.add('active');
  const selected = filter.dataset.filter;
  document.querySelectorAll('[data-type]').forEach(item => {
    item.hidden = selected !== 'all' && item.dataset.type !== selected;
  });
});
