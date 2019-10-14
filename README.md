# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|
|email|string|null: false|
|region_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- belongs_to :region

## regionsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|
|record_point|string|null: false,unique: true|
nameカラムは都道府県の地方（十勝、宗谷など）

### Association
- has_many :users
- has_many :messages
- belongs_to :wether

## wethersテーブル
|Column|Type|Options|
|------|----|-------|
|date|date|null: false|
|wether|integer|null: false|
|temprature|integer|null: false|
|precipitation|integer|null: false|
|wind_speed|integer|null: false|
|hour_of_sunlight|integer|null: false|
|snow_depth|integer|null: false|

### Association
- belongs_to :region

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|user_id|integer|null: false, foreign_key: true|
|region_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :region# wether-app
