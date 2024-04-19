package raf.edu.rs.veb5.repository.post;

import raf.edu.rs.veb5.entities.Post;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class PostRepImpl implements PostRepository{
    private static List<Post> posts = new CopyOnWriteArrayList<>();

    @Override
    public synchronized Post addPost(Post post) {
        Integer id = posts.size();
        post.setId(id);
        posts.add(Math.toIntExact(id), post);

        return post;
    }

    @Override
    public List<Post> getPosts() {
        return new ArrayList<>(posts);
    }

    @Override
    public Post findPost(Integer id) {
        return posts.get(id);
    }

    @Override
    public void deletePost(Integer id) {
        posts.remove(id.intValue());
    }
}
