# == Schema Information
#
# Table name: memberships
#
#  id            :bigint           not null, primary key
#  member_id     :bigint           not null
#  joinable_type :string           not null
#  joinable_id   :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Membership < ApplicationRecord
  validates :joinable_id, :joinable_type, presence: true
  validates :member_id, presence: true, uniqueness: { scope: [:joinable_type, :joinable_id]}

  belongs_to :joinable,
    polymorphic: true
    # touch: true #for future update functionality
    
  belongs_to :member,
    foreign_key: :member_id,
    class_name: :User
    # touch: true #for future update functionality
end
