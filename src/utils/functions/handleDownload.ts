export function handleDownload(): void {
    const link = document.createElement("a")
    link.href = "/file/pedromarquesFullStack.pdf"
    link.download = "pedromarques.pdf";
    link.click();
}