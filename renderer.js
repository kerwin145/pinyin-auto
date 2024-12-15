// renderer.js
const preview = document.getElementById('preview');

document.getElementById('render').addEventListener('click', () => {
    const characters = document.getElementById('characters').value;
    const pinyin = document.getElementById('pinyin').value;

    //TODO
});

document.getElementById('export').addEventListener('click', async () => {
    const targetElement = document.getElementById('preview'); // Replace with the ID of your HTML element
    try {
        const scale = window.devicePixelRatio * 1.5 || 1.5; // Increase resolution by devicePixelRatio
        const rect = targetElement.getBoundingClientRect(); // Get element size and position

        // Render the HTML element to a canvas
        const canvas = await html2canvas(targetElement, {
            backgroundColor: null, // Transparent background
            useCORS: true, // Support cross-origin resources
            scale: scale, // Higher resolution
            width: rect.width, // Original visible width
            height: rect.height, // Original visible height
        });
        
        /*
         const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = rect.width; // Original element width
        resizedCanvas.height = rect.height; // Original element height
        const ctx = resizedCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, rect.width, rect.height); // Resize high-res canvas back

        // Convert the resized canvas to base64 image data
        const imageData = resizedCanvas.toDataURL('image/png');
        */
       
        // Get the base64 image data from the canvas
        const imageData = canvas.toDataURL('image/png');
        // Send the image data to the main process for clipboard export
        const result = await window.ipcRenderer.invoke('export-image', imageData);
        if (result.success) {
            alert(result.message);
        } else {
            alert('Failed to export the image.');
        }
    } catch (error) {
        console.error('Error exporting HTML element:', error);
        alert('An error occurred while exporting the image.');
    }
});
