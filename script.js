document.addEventListener('DOMContentLoaded', function() {
    // Get all image boxes
    const imgBoxes = document.querySelectorAll('.imgBx');
    const infoDisplay = document.querySelector('.info-display');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const infoButton = document.getElementById('info-button');

    // Function to set info and handle active state
    function setInfoFromBox(imgBox) {
        // Remove active class from all boxes
        imgBoxes.forEach(box => box.classList.remove('active'));
        
        // Add active class to clicked box
        imgBox.classList.add('active');
        
        const title = imgBox.getAttribute('data-title');
        const description = imgBox.getAttribute('data-description');
        const buttonText = imgBox.getAttribute('data-button');
        infoTitle.textContent = title;
        infoDescription.textContent = description;
        infoButton.textContent = buttonText;
    }

    // Set first image as active by default
    const firstImgBox = document.querySelector('.imgBx[style*="--i:1"]');
    if (firstImgBox) {
        setInfoFromBox(firstImgBox);
    }

    // Add click event to each image box
    imgBoxes.forEach(imgBox => {
        imgBox.addEventListener('click', function(e) {
            setInfoFromBox(this);
            e.stopPropagation();
        });
    });
});