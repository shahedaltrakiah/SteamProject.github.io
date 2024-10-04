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
    fetch('../data.json')
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

document.addEventListener('DOMContentLoaded', () => {
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            const eventContainer = document.getElementById('events');
            if (eventContainer) {
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
                        </div>

                        <!-- Hidden description section -->
                        <div class="event-description" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out;">
                            <p>${event.brief}</p>
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
                            arrowIcon.classList.add('fa-angle-right');
                        }
                    });

                    eventContainer.appendChild(eventItem);
                });
            } else {
                console.error('Error: Event container not found.');
            }
        })
        .catch(error => console.error('Error fetching the event data:', error));
});

// Fetch the JSON data
fetch('../data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  })
  .then(data => {
    const courses = data.courses;

    // Find the course by its ID (example: "course1")
    const courseId = 10; // You can dynamically set this ID based on your need
    const course = courses.find(c => c.id === courseId); // Find course by ID

    if (!course) {
      console.error('Course not found');
      return;
    }

    // Populate course name and description
    const courseName = document.createElement('h1');
    courseName.id = 'course-name';
    courseName.innerText = course.name;

    const courseDesc = document.createElement('p');
    courseDesc.id = 'course-desc';
    courseDesc.innerText = course.description;

    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
      headerContent.appendChild(courseName);
      headerContent.appendChild(courseDesc);
    } else {
      console.error('Header content element not found.');
    }

    // Populate other course details
    const courseDetail = document.querySelector('#course-detail');
    const courseRate = document.querySelector('#course-rate');
    const courseAge = document.querySelector('#course-age');
    const courseType = document.querySelector('#course-type');

    if (courseDetail) {
      courseDetail.innerText = `Description: ${course.description}`;
    } else {
      console.error('Course detail element not found.');
    }

    if (courseRate) {
      courseRate.innerText = `Rate: ${course.rate}`;
    } else {
      console.error('Course rate element not found.');
    }

    if (courseAge) {
      courseAge.innerText = `Target Age: ${course.target_age}`;
    } else {
      console.error('Course age element not found.');
    }

    if (courseType) {
      courseType.innerText = `Type: ${course.type}`;
    } else {
      console.error('Course type element not found.');
    }

    // Set course video
    const videoElement = document.getElementById('course-video');
    if (videoElement) {
      videoElement.setAttribute('src', course.course_video); 
    } else {
      console.error('Video element not found.');
    }

    // Populate "What You'll Learn" section
    const contentDiv = document.querySelector('.content');
    if (contentDiv) {
      const whatYouWillLearnTitle = document.createElement('h3');
      whatYouWillLearnTitle.innerText = "What You'll Learn:";

      const whatYouWillLearn = document.createElement('p');
      whatYouWillLearn.id = 'what-you-will-learn';
      whatYouWillLearn.innerText = course.youWillLearn;

      contentDiv.appendChild(whatYouWillLearnTitle);
      contentDiv.appendChild(whatYouWillLearn);

      // Enrollment information
      const enrollmentInfoTitle = document.createElement('h3');
      enrollmentInfoTitle.innerText = "Enrollment Information:";

      const enrollmentInfo = document.createElement('p');
      const enrollInfoStrong = document.createElement('strong');
      enrollInfoStrong.id = 'enroll-info';
      enrollInfoStrong.innerText = course.enrollment;

      enrollmentInfo.appendChild(document.createTextNode("Sign up now to secure your spot! Classes start on "));
      enrollmentInfo.appendChild(enrollInfoStrong);

      contentDiv.appendChild(enrollmentInfoTitle);
      contentDiv.appendChild(enrollmentInfo);
    } else {
      console.error('Content element not found.');
    }

    // Handle the comment section
    const commentSection = document.querySelector('.comment-section');
    if (commentSection && Array.isArray(course.comments)) {
      course.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const commentContentDiv = document.createElement('div');
        commentContentDiv.className = 'comment-content';

        const usernameSpan = document.createElement('span');
        usernameSpan.className = 'username';
        usernameSpan.innerText = comment.user;

        const commentP = document.createElement('p');
        commentP.innerText = comment.comment;

        const commentMetaDiv = document.createElement('div');
        commentMetaDiv.className = 'comment-meta';
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp';
        timestampSpan.innerText = comment.date;

        const replyLink = document.createElement('a');
        replyLink.href = '#';
        replyLink.className = 'reply-link';
        replyLink.innerText = 'Reply';

        replyLink.addEventListener('click', function(event) {
          event.preventDefault();
          createReplyForm(commentDiv);
        });

        commentMetaDiv.appendChild(timestampSpan);
        commentMetaDiv.appendChild(replyLink);

        commentContentDiv.appendChild(usernameSpan);
        commentContentDiv.appendChild(commentP);
        commentContentDiv.appendChild(commentMetaDiv);

        commentDiv.appendChild(commentContentDiv);
        commentSection.appendChild(commentDiv);
      });
    } else {
      console.error('Comment section element not found or comments are not an array.');
    }

    // Function to create a reply form
    function createReplyForm(parentDiv) {
      const existingForm = parentDiv.querySelector('.reply-form');
      if (existingForm) return;

      const replyForm = document.createElement('div');
      replyForm.className = 'reply-form mt-3';

      const replyInput = document.createElement('textarea');
      replyInput.className = 'form-control';
      replyInput.placeholder = 'Write your reply...';

      const submitReplyBtn = document.createElement('button');
      submitReplyBtn.className = 'btn btn-primary mt-2';
      submitReplyBtn.innerText = 'Submit Reply';

      submitReplyBtn.addEventListener('click', function() {
        const replyContent = replyInput.value.trim();
        if (replyContent) {
          addReply(parentDiv, replyContent);
          replyForm.remove();
        }
      });

      replyForm.appendChild(replyInput);
      replyForm.appendChild(submitReplyBtn);
      parentDiv.appendChild(replyForm);
    }

    // Function to add the reply to the comment
    function addReply(commentDiv, replyContent) {
      const replyDiv = document.createElement('div');
      replyDiv.className = 'reply mt-2 pl-3';

      const replyContentDiv = document.createElement('div');
      replyContentDiv.className = 'reply-content';

      const usernameSpan = document.createElement('span');
      usernameSpan.className = 'username font-weight-bold';
      usernameSpan.innerText = 'You';

      const replyP = document.createElement('p');
      replyP.className = 'mb-2';
      replyP.innerText = replyContent;

      const replyMetaDiv = document.createElement('div');
      replyMetaDiv.className = 'reply-meta text-muted';
      const replyTimestamp = new Date().toLocaleString();
      const timestampSpan = document.createElement('span');
      timestampSpan.className = 'timestamp';
      timestampSpan.innerText = replyTimestamp;

      replyMetaDiv.appendChild(timestampSpan);
      replyContentDiv.appendChild(usernameSpan);
      replyContentDiv.appendChild(replyP);
      replyContentDiv.appendChild(replyMetaDiv);
      replyDiv.appendChild(replyContentDiv);

      commentDiv.appendChild(replyDiv);
    }

    // Add new comments
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const messageContent = document.getElementById('message-content').value;
        const email = document.getElementById('email').value;

        if (!username || !messageContent || !email) {
          alert('Please fill out all fields.');
          return;
        }

        const newCommentDiv = document.createElement('div');
        newCommentDiv.className = 'comment d-flex mb-4';

        const commentContentDiv = document.createElement('div');
        commentContentDiv.className = 'comment-content d-flex flex-column';

        const usernameSpan = document.createElement('span');
        usernameSpan.className = 'username font-weight-bold';
        usernameSpan.innerText = username;

        const messageP = document.createElement('p');
        messageP.className = 'mb-2';
        messageP.innerText = messageContent;

        const commentMetaDiv = document.createElement('div');
        commentMetaDiv.className = 'comment-meta';
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'timestamp text-muted';
        const timestamp = new Date().toLocaleString();
        timestampSpan.innerText = timestamp;

        commentContentDiv.appendChild(usernameSpan);
        commentContentDiv.appendChild(messageP);
        commentContentDiv.appendChild(commentMetaDiv);
        commentMetaDiv.appendChild(timestampSpan);

        newCommentDiv.appendChild(commentContentDiv);
        commentSection.appendChild(newCommentDiv);

        // Clear input fields
        document.getElementById('username').value = '';
        document.getElementById('message-content').value = '';
        document.getElementById('email').value = '';
      });
    } else {
      console.error('Submit button not found.');
    }

  })
  .catch(error => {
    console.error('Error fetching or processing data:', error);
  });
