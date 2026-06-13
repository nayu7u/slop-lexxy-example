Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :people, only: :index
  resources :posts

  root "posts#index"
end
