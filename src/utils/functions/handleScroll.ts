export const handleScroll = (value: number) => {
  window.scrollTo({
    top: value,
    behavior: "smooth",
  });
};