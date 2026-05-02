export function handleDownload(): void {
  const link = document.createElement("a");
  link.href = "/file/pedro-marques-fullstack.pdf";
  link.download = "pedro-marques-fullstack.pdf";
  link.click();
}
