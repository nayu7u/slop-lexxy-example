require "test_helper"

class PersonTest < ActiveSupport::TestCase
  test "should be invalid without name" do
    person = Person.new(name: nil, initials: "AB")
    assert_not person.valid?
    assert_includes person.errors[:name], "can't be blank"
  end

  test "should be invalid without initials" do
    person = Person.new(name: "Alice", initials: nil)
    assert_not person.valid?
    assert_includes person.errors[:initials], "can't be blank"
  end

  test "initials should not exceed 10 characters" do
    person = Person.new(name: "Alice", initials: "A" * 11)
    assert_not person.valid?
    assert_includes person.errors[:initials], "is too long (maximum is 10 characters)"
  end

  test "content_type returns mention mime type" do
    person = Person.new(name: "Alice", initials: "AJ")
    assert_equal "application/vnd.actiontext.mention", person.content_type
  end

  test "to_attachable_partial_path returns expected path" do
    person = Person.new(name: "Alice", initials: "AJ")
    assert_equal "people/person", person.to_attachable_partial_path
  end
end
