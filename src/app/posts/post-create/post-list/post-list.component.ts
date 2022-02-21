import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from '../../post.model'
import { PostsService } from "../../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 posts: Post[] = [];
 private postsSub: Subscription = new Subscription; // added 'new Subscription for error fix 2:24

 constructor(public postsService: PostsService) {}

 ngOnInit() {
   this.posts = this.postsService.getPosts();
   this.postsSub = this.postsService.getPostUpdateListenter()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
