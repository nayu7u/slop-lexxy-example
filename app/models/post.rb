class Post < ApplicationRecord
  has_rich_text :content

  validates :title, presence: true, allow_blank: true

  scope :recent, -> { order(created_at: :desc) }
end
