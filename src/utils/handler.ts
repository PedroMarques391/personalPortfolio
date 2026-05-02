export default class Handler {
  static download(): void {
    const link = document.createElement("a");
    link.href = "/curriculo.pdf";
    link.download = "curriculo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static scroll(id: string | number) {
    let top: number | undefined;

    if (typeof id === "string") {
      const el = document.getElementById(id);
      if (!el) return;
      top = el.offsetTop - 120;
    }
    if (typeof id === "number") {
      top = id;
    }
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}
