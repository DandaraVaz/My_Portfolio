class MobileNavbar {
  constructor(mobileMenuSelector, navListSelector, navLinksSelector) {
    this.mobileMenu = document.querySelector(mobileMenuSelector);
    this.navList = document.querySelector(navListSelector);
    this.navLinks = document.querySelectorAll(navLinksSelector);
    this.closeBtn = document.querySelector(".close-btn");
    this.backdrop = document.querySelector(".nav-backdrop");
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.45s ease forwards ${
          index / 7 + 0.12
        }s`;
      }
    });
  }

  handleClick() {
    const isActive = this.navList.classList.toggle(this.activeClass);
    // update accessible attributes
    if (this.mobileMenu)
      this.mobileMenu.setAttribute(
        "aria-expanded",
        isActive ? "true" : "false"
      );
    if (this.mobileMenu) this.mobileMenu.classList.toggle("open", isActive);
    this.animateLinks();
    // lock scroll when menu open
    document.body.style.overflow = isActive ? "hidden" : "";
    // show backdrop
    if (this.backdrop) {
      this.backdrop.hidden = !isActive;
      this.backdrop.classList.toggle("visible", isActive);
    }
    // focus first link when opening
    if (isActive) {
      const first = this.navLinks[0];
      if (first) first.focus();
    }
  }

  handleLinkClick() {
    // close menu when a link is clicked
    this.navList.classList.remove(this.activeClass);
    if (this.mobileMenu) this.mobileMenu.setAttribute("aria-expanded", "false");
    if (this.mobileMenu) this.mobileMenu.classList.remove("open");
    this.animateLinks();
    document.body.style.overflow = "";
    if (this.backdrop) {
      this.backdrop.hidden = true;
      this.backdrop.classList.remove("visible");
    }
    // return focus to the hamburger button
    if (this.mobileMenu) this.mobileMenu.focus();
  }

  handleKeyDown(e) {
    if (
      e.key === "Escape" &&
      this.navList.classList.contains(this.activeClass)
    ) {
      this.navList.classList.remove(this.activeClass);
      if (this.mobileMenu)
        this.mobileMenu.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (this.mobileMenu) this.mobileMenu.classList.remove("open");
      if (this.backdrop) {
        this.backdrop.hidden = true;
        this.backdrop.classList.remove("visible");
      }
      if (this.mobileMenu) this.mobileMenu.focus();
    }
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
    this.navLinks.forEach((link) =>
      link.addEventListener("click", this.handleLinkClick)
    );
    if (this.closeBtn)
      this.closeBtn.addEventListener("click", this.handleLinkClick);
    if (this.backdrop)
      this.backdrop.addEventListener("click", this.handleLinkClick);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  init() {
    if (this.mobileMenu && this.navList) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list a"
);
mobileNavbar.init();
