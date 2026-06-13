Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :people, only: :index
  resources :posts
  get "practicals", to: "practicals#index"

  root "posts#index"
end
