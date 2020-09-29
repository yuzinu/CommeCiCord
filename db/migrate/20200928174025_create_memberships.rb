class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.references :member, null: false
      t.references :joinable, polymorphic: true, null: false

      t.timestamps
    end

    add_index :memberships, [:joinable_type, :joinable_id, :member_id], name: "index_memberships_on_joinable_and_member_id", unique: true
  end
end
