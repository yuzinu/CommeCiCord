# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
  validates :name, :server_id, presence: true

  belongs_to :server,
    foreign_key: :server_id,
    class_name: :Server
    # touch: true #for future update functionality

  has_many :members,
    through: :server,
    source: :members

  has_many :messages,
    as: :messageable,
    dependent: :destroy
end
