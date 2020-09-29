class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :author, null: false
      t.references :messageable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
