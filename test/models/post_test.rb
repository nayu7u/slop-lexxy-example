require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "should be valid with a title" do
    post = Post.new(title: "My first post")
    assert post.valid?
  end

  test "should be valid without a title" do
    # `allow_blank: true` means it accepts nil and empty string
    post = Post.new(title: nil)
    assert post.valid?

    post = Post.new(title: "")
    assert post.valid?
  end

  test "should allow rich text content" do
    post = Post.create!(title: "Test")
    assert post.content.is_a?(ActionText::RichText)
  end

  test "recent scope returns posts ordered by created_at desc" do
    older = Post.create!(title: "Older", created_at: 2.days.ago)
    newer = Post.create!(title: "Newer", created_at: 1.hour.ago)
    post_ids = [ older.id, newer.id ]

    scoped_posts = Post.recent.where(id: post_ids).to_a
    assert_equal [ newer, older ], scoped_posts
  end
end
