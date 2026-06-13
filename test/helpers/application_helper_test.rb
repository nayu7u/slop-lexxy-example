require "test_helper"

class ApplicationHelperTest < ActionView::TestCase
  test "display_post_title returns title when present" do
    post = Post.new(title: "Hello")
    assert_equal "Hello", display_post_title(post)
  end

  test "display_post_title returns Untitled when blank" do
    post = Post.new(title: nil)
    assert_equal "Untitled", display_post_title(post)

    post = Post.new(title: "")
    assert_equal "Untitled", display_post_title(post)
  end
end
