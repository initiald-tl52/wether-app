# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_22_002405) do

  create_table "messages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id"
    t.bigint "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["region_id"], name: "index_messages_on_region_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "regions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "record_point"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "alfabet_record_point"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "region_id"
    t.index ["region_id"], name: "index_users_on_region_id"
  end

  create_table "wethers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.date "date"
    t.decimal "temprature", precision: 6, scale: 2
    t.decimal "precipitation", precision: 6, scale: 2
    t.decimal "wind_speed", precision: 6, scale: 2
    t.decimal "hour_of_sunlight", precision: 6, scale: 2
    t.integer "snow_depth"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "region_id"
    t.decimal "normal_temprature", precision: 6, scale: 2
    t.decimal "normal_precipitation", precision: 6, scale: 2
    t.decimal "normal_wind_speed", precision: 6, scale: 2
    t.decimal "normal_hour_of_sunlight", precision: 6, scale: 2
    t.integer "normal_snow_depth"
    t.index ["region_id"], name: "index_wethers_on_region_id"
  end

  add_foreign_key "messages", "regions"
  add_foreign_key "messages", "users"
  add_foreign_key "wethers", "regions"
end
