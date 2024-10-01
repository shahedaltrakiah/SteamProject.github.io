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

