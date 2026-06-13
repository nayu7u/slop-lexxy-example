class Person < ApplicationRecord
  include ActionText::Attachable

  def content_type
    "application/vnd.actiontext.mention"
  end

  def to_attachable_partial_path
    "people/person"
  end
end
