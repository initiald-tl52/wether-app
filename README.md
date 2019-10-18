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
- has_many :wether

## wethersテーブル
|Column|Type|Options|
|------|----|-------|
|date|date|null: false|
|temprature|decimal(4,2)|null: false|
|precipitation|decimal(4,2)|null: false|
|wind_speed|decimal(4,2)|null: false|
|hour_of_sunlight|decimal(4,2)|null: false|
|snow_depth|integer|null: false|
|region_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :region

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|region_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :region
