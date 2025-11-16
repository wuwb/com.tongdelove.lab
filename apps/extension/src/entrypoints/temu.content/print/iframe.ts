export function createIframe(id: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe')
  iframe.id = id
  iframe.style.position = 'fixed'
  iframe.style.top = '0'
  iframe.style.left = '0'
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = 'none'
  iframe.style.zIndex = '-1'
  iframe.style.visibility = 'hidden'

  iframe.style.opacity = '0'
  iframe.style.pointerEvents = 'none'
  return iframe
}

export function writeIframeContent(iframe: HTMLIFrameElement, content: string) {
  // const doc = iframe.contentDocument!;
  // doc.open();
  // doc.write(content);
  // doc.close();
  iframe.srcdoc = content
}
