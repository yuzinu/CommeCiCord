# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
  validates :name, :owner_id, presence: true
  validates :owner_id, uniqueness: true

  has_one_attached :icon

  belongs_to :owner,
    class_name: :User,
    foreign_key: :owner_id
end
