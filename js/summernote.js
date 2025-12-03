window.initializeSummernote = (dotNetHelper) => {
    $('#summernote-editor').summernote({
        height: 380,
        placeholder: 'Type circular content here...',
        callbacks: {
            onChange: (contents) => {
                dotNetHelper.invokeMethodAsync('UpdateContentFromEditor', contents);
            }
        }
    });
};

window.copyHtmlToClipboard = async (html) => {
    try {
        const blobHtml = new Blob([html], { type: 'text/html' });
        const blobText = new Blob([html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()], { type: 'text/plain' });
        const item = new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText });
        await navigator.clipboard.write([item]);
    } catch (e) {
        alert("Copied as plain text (your browser blocked rich paste)");
        navigator.clipboard.writeText(html.replace(/<[^>]*>/g, ''));
    }
};