class Reaction < ApplicationRecord
   belongs_to :reactable, polymorphic: true

   scope :likes, -> { where(is_like: true) }
   scope :dislikes, -> { where(is_like: false) }
end
