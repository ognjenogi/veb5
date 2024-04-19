package raf.edu.rs.veb5.service;


import raf.edu.rs.veb5.entities.Comment;
import raf.edu.rs.veb5.entities.Post;
import raf.edu.rs.veb5.repository.post.PostRepository;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

public class PostService {
    @Inject
    private PostRepository postRepository;

    public Post addPost(Post post) {
        return this.postRepository.addPost(post);
    }

    public List<Post> getPosts() {
        return this.postRepository.getPosts();
    }

    public Post findPost(Integer id) {
        return this.postRepository.findPost(id);    }

    public void deletePost(Integer id) {
        this.postRepository.deletePost(id);
    }
}
