const newPostForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-blog-name').value.trim();
    const body = document.querySelector('#new-blog-content').value.trim();

    if (title && body) {
        const response = await fetch(`/dashboard`, {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog');
        }
    }
};

document
    .querySelector('#submit-blog')
    .addEventListener('click', newPostForm)



    