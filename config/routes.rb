Rails.application.routes.draw do
  root 'wether#index'
  get 'wether/show'
end
