document.addEventListener('DOMContentLoaded', function() {

    // Loop through all elements with the class read-more-btn
    document.querySelectorAll('.read-more-btn').forEach(readMoreBtn => {

        // Add a click event listener to each read-more-btn
        readMoreBtn.addEventListener('click', function() {

            // Find the closest parent element with the class card
            var card = this.closest('.card'); 

            // Within the card, find the element with the class 'review-content truncated'
            var truncated = card.querySelector('.review-content.truncated');

            // Within the card, find the element with the class 'full-review-content hidden'
            var fullReview = card.querySelector('.full-review-content.hidden');

            // Check if the truncated review is currently displayed
            if (truncated.style.display !== 'none') {
                // If it is, hide the truncated review
                truncated.style.display = 'none';
                // Show the full review
                fullReview.style.display = 'block';
                // Add some css for the button
                this.textContent = 'Read less';
                this.style.backgroundColor = 'var(--primary)';
                this.style.transformOrigin = 'center';
                this.style.transition = 'background-color 0.3s, transform 0.5s';
            } else {
                // If the truncated review is not displayed, show it
                truncated.style.display = 'block';
                // Hide the full review
                fullReview.style.display = 'none';
                // Add some css for the button
                this.textContent = 'Read more';
                this.style.backgroundColor = '';
                this.style.transition = 'background-color 0.3s, transform 0.5s';
            }
        });
    });
});
