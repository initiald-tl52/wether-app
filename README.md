# README

# アプリケーション概要
最新の天気予報と気象庁の過去1ヶ月の気温とその平年値をグラフ化するアプリケーション

# アプリケーション内で使用している技術一覧
## 言語・ライブラリ
・Chart.js・PostgreSQL・Haml・SCSS・Ruby・Ruby on Rails・JavaScript・jQuery
## API
OpenWetherAPI

# DB設計
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
