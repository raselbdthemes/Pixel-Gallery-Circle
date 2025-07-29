document.addEventListener('DOMContentLoaded', function() {
    // Get all image boxes
    const imgBoxes = document.querySelectorAll('.imgBx');
    const infoDisplay = document.querySelector('.info-display');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const infoButton = document.getElementById('info-button');

    // Function to set info
    function setInfoFromBox(imgBox) {
        const title = imgBox.getAttribute('data-title');
        const description = imgBox.getAttribute('data-description');
        const buttonText = imgBox.getAttribute('data-button');
        infoTitle.textContent = title;
        infoDescription.textContent = description;
        infoButton.textContent = buttonText;
    }

    // প্রথম .imgBx (যার --i:1) এর তথ্য ডিফল্ট হিসেবে দেখাও
    const firstImgBox = document.querySelector('.imgBx[style*="--i:1"]');
    if (firstImgBox) {
        setInfoFromBox(firstImgBox);
        infoDisplay.classList.add('show');
    }

    // Add click event to each image box
    imgBoxes.forEach(imgBox => {
        imgBox.addEventListener('click', function(e) {
            setInfoFromBox(this);
            infoDisplay.classList.add('show');
            e.stopPropagation(); // Prevent document click from firing
        });
    });

    // info-display সবসময় visible থাকবে, তাই hide করার কোনো event নেই
});