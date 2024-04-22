// Define DOM elements
const postsContainer = document.getElementById('posts-container');
const postDetails = document.getElementById('post-details');
const newPostForm = document.getElementById('new-post-form');
const postsList = document.getElementById('posts-list');
const postTitle = document.getElementById('post-title');
const postAuthor = document.getElementById('post-author');
const postDate = document.getElementById('post-date');
const postContent = document.getElementById('post-content');
const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const newPostBtn = document.getElementById('new-post-btn');
const postTitleInput = document.getElementById('post-title-input');
const postAuthorInput = document.getElementById('post-author-input');
const postContentInput = document.getElementById('post-content-input');
const commentAuthorInput = document.getElementById('comment-author');
const commentTextInput = document.getElementById('comment-text');

let currentPostId = null;
function fetchPosts() {
    fetch('http://localhost:8080/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            posts = data;
            renderPosts();
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

window.addEventListener('load', fetchPosts);
function renderPosts() {
    postsList.innerHTML = '';
    posts.forEach(post => {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        title.textContent = post.title;
        const excerpt = document.createElement('p');
        excerpt.textContent = post.content.substring(0, 250) + '...';
        li.appendChild(title);
        li.appendChild(excerpt);
        li.addEventListener('click', () => {
            showPostDetails(post.id);
        });
        postsList.appendChild(li);
    });
}

function showPostDetails(postId) {
    fetch(`http://localhost:8080/api/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            currentPostId = postId;
            postTitle.textContent = post.title;
            postAuthor.textContent = post.author;
            postDate.textContent = post.date;
            postContent.textContent = post.content;
            renderComments(post.comments);
            hideElement(postsContainer);
            showElement(postDetails);
        })
        .catch(error => {
            console.error('Error fetching post details:', error);
        });
}
function renderComments(comments) {
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = `${comment.author}: ${comment.text}`;
        commentsList.appendChild(li);
    });
}

function addComment(event) {

    event.preventDefault();
    const author = commentAuthorInput.value.trim();
    const text = commentTextInput.value.trim();
    if (author && text) {
        const commentData = {
            postId: currentPostId,
            author: author,
            text: text
        };
        fetch('http://localhost:8080/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }
                return response.json();
            })
            .then(comment => {
                // Add the new comment to the UI
                const li = document.createElement('li');
                li.textContent = `${comment.author}: ${comment.text}`;
                commentsList.appendChild(li);

                // Clear the comment input fields
                commentAuthorInput.value = '';
                commentTextInput.value = '';
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    }
}



function showNewPostForm() {
    hideElement(postsContainer);
    hideElement(postDetails);
    showElement(newPostForm);
}

function createPost(event) {
    event.preventDefault();
    const title = postTitleInput.value.trim();
    const author = postAuthorInput.value.trim();
    const content = postContentInput.value.trim();
    if (title && author && content) {
        const postData = {
            title: title,
            author: author,
            content: content
        };

        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create post');
                }
                return response.json();
            })
            .then(data => {
                posts.push(data);
                renderPosts();
                postTitleInput.value = '';
                postAuthorInput.value = '';
                postContentInput.value = '';
                hideElement(newPostForm);
                showElement(postsContainer);
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    }
}



function showElement(element) {
    element.classList.remove('hidden');
}


function hideElement(element) {
    element.classList.add('hidden');
}

commentForm.addEventListener('submit', addComment);
newPostBtn.addEventListener('click', showNewPostForm);
newPostForm.addEventListener('submit', createPost);


renderPosts();
