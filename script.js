   // Setting PDF.js worker
   pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

   document.addEventListener('DOMContentLoaded', function () {
       const viewButtons = document.querySelectorAll('.view-cert');

       viewButtons.forEach(button => {
           button.addEventListener('click', function () {
               const pdfUrl = this.getAttribute('data-cert');
               loadPdf(pdfUrl);
           });
       });

       function loadPdf(url) {
           const container = document.getElementById('pdfViewer');
           container.innerHTML = '';

           const loadingText = document.createElement('div');
           loadingText.className = 'text-center my-5';
           loadingText.innerHTML = '<div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading certificate...</p>';
           container.appendChild(loadingText);

           const loadingTask = pdfjsLib.getDocument(url);
           loadingTask.promise.then(function (pdf) {
               container.innerHTML = '';

               pdf.getPage(1).then(function (page) {
                   // Get the original viewport at scale 1.0
                   const originalViewport = page.getViewport({ scale: 1.0 });

                   // Calculate scale to fit 500px in both dimensions
                   const scaleX = 900 / originalViewport.width;
                   const scaleY = 900 / originalViewport.height;
                   const scale = Math.min(scaleX, scaleY);

                   // Create the viewport with the calculated scale
                   const viewport = page.getViewport({ scale: scale });

                   const canvas = document.createElement('canvas');
                   container.appendChild(canvas);
                   const context = canvas.getContext('2d');
                   canvas.height = viewport.height;
                   canvas.width = viewport.width;
                   canvas.className = 'mx-auto d-block';

                   const renderContext = {
                       canvasContext: context,
                       viewport: viewport
                   };

                   page.render(renderContext);
               });
           }).catch(function (error) {
               container.innerHTML = `<div class="alert alert-danger">Failed to load PDF: ${error.message}</div>`;
           });
       }

       // typing Effect javascript
       const texts = [
           "I am a Fullstack Web Developer",
           "Bioinformatics Student",
           "I am a problem solver",
           "I love Coding"
       ];
       let textIndex = 0;
       let charIndex = 0;
       const speed = 100;
       const cursor = '|';
       let isDeleting = false;

       function typeEffect() {
           const currentText = texts[textIndex];
           const displayText = isDeleting ? currentText.substring(0, charIndex) : currentText.substring(0, charIndex + 1);
           document.getElementById("te").innerHTML = displayText + cursor;

           if (!isDeleting && charIndex < currentText.length) {
               charIndex++;
               setTimeout(typeEffect, speed);
           } else if (isDeleting && charIndex > 0) {
               charIndex--;
               setTimeout(typeEffect, speed);
           } else {
               isDeleting = !isDeleting;
               if (!isDeleting) {
                   textIndex = (textIndex + 1) % texts.length;
               }
               setTimeout(typeEffect, 1800); // delay before starting next text
           }
       }

       typeEffect();
   });
