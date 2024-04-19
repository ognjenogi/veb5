package raf.edu.rs.veb5;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import raf.edu.rs.veb5.repository.comment.CommentRepImpl;
import raf.edu.rs.veb5.repository.comment.CommentRepository;
import raf.edu.rs.veb5.repository.post.PostRepImpl;
import raf.edu.rs.veb5.repository.post.PostRepository;
import raf.edu.rs.veb5.service.CommentService;
import raf.edu.rs.veb5.service.PostService;

import javax.inject.Singleton;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/api")
public class HelloApplication extends ResourceConfig {

    public HelloApplication() {
        property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true);

        AbstractBinder binder = new AbstractBinder() {
            @Override
            protected void configure() {
                this.bind(PostRepImpl.class).to(PostRepository.class).in(Singleton.class);
                this.bind(CommentRepImpl.class).to(CommentRepository.class).in(Singleton.class);

                this.bindAsContract(PostService.class);
                this.bindAsContract(CommentService.class);
            }
        };
        register(binder);

        packages("raf.edu.rs.veb5.resources");
    }
}