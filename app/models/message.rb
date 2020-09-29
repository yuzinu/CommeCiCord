# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  author_id        :bigint           not null
#  messageable_type :string           not null
#  messageable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
  validates :body, :author_id, :messageable_id, :messageable_type, presence: true
  
  belongs_to :messageable,
    polymorphic: true
    # touch: true #for future update functionality

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User
end
