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
document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from data.json
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const testimonials = data.testimonials; // Assuming data.json has a 'testimonials' array

        // Select all testimonial elements
        const testimonialCards = document.querySelectorAll('.testimonial-3');

        // Loop through each testimonial and populate the HTML
        testimonialCards.forEach((card, index) => {
            if (testimonials[index]) { // Ensure there's a testimonial to match the card
                const img = card.querySelector('.vcard');
                const name = card.querySelector('h3');
                const feedback = card.querySelector('p');

                // Set the content from the JSON data
                img.src = testimonials[index].image; // Set image from JSON
                console.log(testimonials[index].image);
                img.alt = 'Image of ' + testimonials[index].name; // Set alt text
                name.textContent = testimonials[index].name; // Set name from JSON
                console.log(testimonials[index].name);
                feedback.textContent = testimonials[index].comment; // Set comment from JSON
                console.log(testimonials[index].image);

            }
        });

        // Initialize Owl Carousel after testimonials have been populated
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 20, // Set margin between items in the carousel
            nav: true,   // Enable navigation buttons
            autoplay: true, // Disable automatic sliding
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    })
    .catch(error => console.error('Error fetching testimonials:', error));
});

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const eventContainer = document.getElementById('events');
        data.events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('item');
            eventItem.innerHTML = `
                <div class="row">
                    <div class="col-lg-2">
                        <div class="image">
                            <img src="${event.image}" alt="${event.name}">
                        </div>
                    </div>
                    <div class="col-lg-10">
                        <ul class="list-unstyled">
                            <li>
                                <h4>${event.name}</h4>
                            </li>
                            <li>
                                <span>Date:</span>
                                <h6>${event.date}</h6>
                            </li>
                            <li>
                                <span>Duration:</span>
                                <h6>${event.duration}</h6>
                            </li>
                        </ul>
                        <a href="#" class="event-link"><i class="fa fa-angle-right"></i></a>
                    </div>
                     <!-- Hidden description section -->
                <div class="event-description" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out;">
                    <p>${event.brief}</p>
                </div>
                </div>

               
            `;

            // Add click event to the event link
            eventItem.querySelector('.event-link').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent the default anchor behavior
                const description = eventItem.querySelector('.event-description');
                const arrowIcon = eventItem.querySelector('.fa');

                // Toggle the 'show' class to expand/collapse description
                if (description.style.maxHeight === '0px' || description.style.maxHeight === '') {
                    description.style.maxHeight = description.scrollHeight + 'px'; // Expand to fit content
                    arrowIcon.classList.remove('fa-angle-right'); // Change arrow to down
                    arrowIcon.classList.add('fa-angle-down');
                } else {
                    description.style.maxHeight = '0px'; // Collapse
                    arrowIcon.classList.remove('fa-angle-down'); // Change arrow to right
                   console.log (arrowIcon.classList.add('fa-angle-right'))
                }
            });

            eventContainer.appendChild(eventItem);
        });
    })
    .catch(error => console.error('Error fetching the event data:', error));
