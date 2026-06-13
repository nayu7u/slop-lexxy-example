module ApplicationHelper
  def nav_link_to(name, path, options = {})
    active = current_page?(path)
    base_classes = "transition-colors"
    active_classes = "text-blue-600 font-medium"
    inactive_classes = "text-gray-500 hover:text-gray-700"

    link_to(
      name,
      path,
      options.merge(class: "#{base_classes} #{active ? active_classes : inactive_classes} #{options[:class]}".strip)
    )
  end

  def display_post_title(post)
    post.title.presence || "Untitled"
  end
end
