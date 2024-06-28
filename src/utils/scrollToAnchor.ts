export const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const target = e.currentTarget.getAttribute('href');
  if (target) {
    const element = document.querySelector(target);
    if (element) {
      const headerHeight = document.querySelector('header')?.clientHeight;
      const offset = headerHeight ? headerHeight : 0;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }
};
