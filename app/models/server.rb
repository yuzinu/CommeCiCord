# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
  validates :name, :owner_id, presence: true

  has_one_attached :icon

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :memberships,
    as: :joinable,
    dependent: :destroy

  has_many :members,
    through: :memberships,
    source: :member

  has_many :channels,
    foreign_key: :server_id,
    class_name: :Channel,
    dependent: :destroy
end
