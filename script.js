(() => {
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;

        if (isCurrent) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-25% 0px -60%", threshold: [0, 0.25, 0.6] },
  );

  sections.forEach((section) => observer.observe(section));
})();
