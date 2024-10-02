document.addEventListener('DOMContentLoaded', function () {
    let counters = document.querySelectorAll('.milestone_counter');
    let speed = 200; // Adjust the speed of the count-up

    counters.forEach(counter => {
        let updateCount = () => {
            let target = +counter.getAttribute('data-end-value');
            let count = +counter.innerText;
            let increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1); // Repeat the function until the target is reached
            } else {
                counter.innerText = target;
            }
        };

        // Trigger counter animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect(); // Stop observing once the count is done
            }
        }, { threshold: 0.6 });

        observer.observe(counter);
    });
});

// Get all filter links
const filterLinks = document.querySelectorAll('.event_filter a');
const eventBoxes = document.querySelectorAll('.event_outer');

// Add click event listener to each filter link
filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove 'is_active' class from all links
        filterLinks.forEach(link => link.classList.remove('is_active'));

        // Add 'is_active' class to the clicked link
        this.classList.add('is_active');

        // Get the filter value from the clicked link
        const filterValue = this.getAttribute('data-filter');

        // Show or hide event boxes based on the filter
        eventBoxes.forEach(box => {
            if (filterValue === '*' || box.classList.contains(filterValue.substring(1))) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

