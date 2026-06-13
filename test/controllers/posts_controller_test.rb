require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = Post.create!(title: "Sample Post")
  end

  test "should get index" do
    get posts_url
    assert_response :success
    assert_select "h1", "Lexxy Playground"
  end

  test "should get new" do
    get new_post_url
    assert_response :success
    assert_select "h1", "New Post"
  end

  test "should create post" do
    assert_difference("Post.count") do
      post posts_url, params: { post: { title: "New post", content: "Hello" } }
    end

    assert_redirected_to post_url(Post.last)
    assert_equal "Post was successfully created.", flash[:notice]
  end

  test "should show post" do
    get post_url(@post)
    assert_response :success
    assert_select "h1", @post.title
  end

  test "should get edit" do
    get edit_post_url(@post)
    assert_response :success
    assert_select "h1", "Edit Post"
  end

  test "should update post" do
    patch post_url(@post), params: { post: { title: "Updated title" } }
    assert_redirected_to post_url(@post)
    @post.reload
    assert_equal "Updated title", @post.title
  end

  test "should destroy post" do
    assert_difference("Post.count", -1) do
      delete post_url(@post)
    end

    assert_redirected_to posts_url
  end
end
