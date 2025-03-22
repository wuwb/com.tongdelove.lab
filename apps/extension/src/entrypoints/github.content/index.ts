
// Function to extract and calculate the difference
function calculateDifference(element: Element): number | null {
  const successSpan = element.querySelector('.color-fg-success');
  const dangerSpan = element.querySelector('.color-fg-danger');

  if (successSpan && dangerSpan) {
    const successNumber = parseInt(successSpan.textContent?.replace(/[^0-9]/g, '') || '0', 10);
    const dangerNumber = parseInt(dangerSpan.textContent?.replace(/[^0-9]/g, '') || '0', 10);
    return successNumber - dangerNumber;
  }

  return null;
}

// Function to insert the difference
function insertDifference(element: Element, difference: number): void {
  const newSpan = document.createElement('span');
  newSpan.textContent = `Difference: ${difference}`;
  newSpan.style.marginLeft = '10px';
  element.appendChild(newSpan);
}

// Main function to process the page
export function processContributorsPage(): void {
  console.log("DOMContentLoaded")

  // const url = window.location.href;
  // if (!url.match(/^https:\/\/github\.com\/[^\/]+\/[^\/]+\/graphs\/contributors$/)) {
  //   return;
  // }

  const elements = document.querySelectorAll('span.color-fg-success, span.color-fg-danger');

  console.log('elements: ', elements)

  elements.forEach((element) => {
    const parentElement = element.parentElement;
    if (parentElement) {
      const difference = calculateDifference(parentElement);
      console.log('difference: ', difference)
      if (difference !== null) {
        insertDifference(parentElement, difference);
      }
    }
  });
}

// Run the main function when the content script is injected
// processContributorsPage();

export default defineContentScript({
  matches: ['https://github.com/FlowGPT/flow/graphs/contributors'],
  runAt: 'document_start',
  main() {
    processContributorsPage()
  },
});
