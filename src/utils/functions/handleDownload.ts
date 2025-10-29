export function handleDownload(): void {
  const link = document.createElement("a");
  link.href = "/file/pedroMarquesFullStack.pdf";
  link.download = "pedromarques.pdf";
  link.click();
}
