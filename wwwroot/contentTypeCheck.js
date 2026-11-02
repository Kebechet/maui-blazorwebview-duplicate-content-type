// Fetches static files served by BlazorWebView and reports the Content-Type the page actually sees.
window.checkContentTypes = async function (paths) {
    const results = [];

    for (const path of paths) {
        const response = await fetch(path);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });

        const result = {
            path: path,
            status: response.status,
            contentTypeHeader: response.headers.get('content-type'),
            blobType: blob.type,
            dataUrlPrefix: dataUrl.substring(0, dataUrl.indexOf(',', dataUrl.indexOf(';base64')) + 1)
        };

        console.log('[content-type-check] ' + JSON.stringify(result));
        results.push(result);
    }

    return {
        userAgent: navigator.userAgent,
        results: results
    };
};
