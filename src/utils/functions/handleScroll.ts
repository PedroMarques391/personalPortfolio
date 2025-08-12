export const handleScroll = (id: string | number) => {
  let top: number | undefined;

  if (typeof id === 'string') {
    const el = document.getElementById(id);
    if (!el) return;
    top = el.offsetTop - 120;
  }
  if (typeof id === 'number') {
    top = id;
  }
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};
