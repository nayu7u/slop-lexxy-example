class Person < ApplicationRecord
  include ActionText::Attachable

  validates :name, presence: true
  validates :initials, presence: true, length: { maximum: 10 }

  def content_type
    "application/vnd.actiontext.mention"
  end

  def to_attachable_partial_path
    "people/person"
  end
end
