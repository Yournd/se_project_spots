export function setLoadingText(btn, isLoading, loadingText, defaultText) {
isLoading ? btn.textContent = `${loadingText}` : btn.textContent = `${defaultText}`;
}