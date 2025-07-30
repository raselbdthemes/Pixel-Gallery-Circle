document.addEventListener('DOMContentLoaded', function() {
    // Get all image boxes
    const imgBoxes = document.querySelectorAll('.imgBx');
    const infoDisplay = document.querySelector('.info-display');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const infoButton = document.getElementById('info-button');
    
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Track current active index
    let currentIndex = 0;

    // Function to truncate text to 10 words on mobile
    function truncateDescription(text) {
        if (window.innerWidth <= 768) {
            const words = text.split(' ');
            if (words.length > 10) {
                return words.slice(0, 10).join(' ') + '...';
            }
        }
        return text;
    }

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
        infoDescription.textContent = truncateDescription(description);
        infoButton.textContent = buttonText;
        
        // Update current index based on the imgBox
        const index = Array.from(imgBoxes).indexOf(imgBox);
        if (index !== -1) {
            currentIndex = index;
        }
    }

    // Function to navigate to next item
    function goToNext() {
        currentIndex = (currentIndex + 1) % imgBoxes.length;
        const nextImgBox = imgBoxes[currentIndex];
        setInfoFromBox(nextImgBox);
        updateNavigationButtons();
    }

    // Function to navigate to previous item
    function goToPrevious() {
        currentIndex = (currentIndex - 1 + imgBoxes.length) % imgBoxes.length;
        const prevImgBox = imgBoxes[currentIndex];
        setInfoFromBox(prevImgBox);
        updateNavigationButtons();
    }

    // Function to update navigation button states
    function updateNavigationButtons() {
        // For circular navigation, buttons are always enabled
        // But you can add specific logic here if needed
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    // Set first image as active by default
    const firstImgBox = document.querySelector('.imgBx[style*="--i:1"]');
    if (firstImgBox) {
        setInfoFromBox(firstImgBox);
        currentIndex = 0;
        updateNavigationButtons();
    }

    // Add click event to each image box
    imgBoxes.forEach((imgBox, index) => {
        imgBox.addEventListener('click', function(e) {
            setInfoFromBox(this);
            currentIndex = index;
            updateNavigationButtons();
            e.stopPropagation();
        });
    });

    // Add event listeners for navigation buttons
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrevious);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            goToNext();
        } else if (e.key === 'ArrowLeft') {
            goToPrevious();
        }
    });

    // Handle window resize to update descriptions
    window.addEventListener('resize', function() {
        // Update current description when screen size changes
        if (imgBoxes[currentIndex]) {
            const currentImgBox = imgBoxes[currentIndex];
            const description = currentImgBox.getAttribute('data-description');
            infoDescription.textContent = truncateDescription(description);
        }
    });
});