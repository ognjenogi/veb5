package raf.edu.rs.veb5.repository.comment;

import raf.edu.rs.veb5.entities.Comment;

import java.util.List;

public interface CommentRepository {
    public Comment addComment(Comment comment);
    public List<Comment> getComments();
    public Comment findComment(Integer id);
    public void deleteComment(Integer id);
}
