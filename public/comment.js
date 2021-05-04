const newComment = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#comment-form').value.trim();
    const blog_id = document.querySelector('#postId').value.trim();

    if (body) {
        const response = await fetch(`/blog`, {
            method: 'POST',
            body: JSON.stringify({body, blog_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create comment');
        }
    }
};

document
    .querySelector('#submit-comment')
    .addEventListener('click', newComment)