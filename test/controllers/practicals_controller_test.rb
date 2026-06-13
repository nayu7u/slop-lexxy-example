require "test_helper"

class PracticalsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get practicals_url
    assert_response :success
    assert_select "h1", "実務ユースケース"
  end

  test "should handle submitted param" do
    get practicals_url, params: { submitted: "blog" }
    assert_response :success
  end
end
