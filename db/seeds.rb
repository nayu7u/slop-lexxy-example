people = [
  { name: "Alice Johnson", initials: "AJ" },
  { name: "Bob Smith", initials: "BS" },
  { name: "Charlie Brown", initials: "CB" },
  { name: "Diana Prince", initials: "DP" },
  { name: "Eve Martinez", initials: "EM" },
  { name: "Frank Castle", initials: "FC" },
  { name: "Grace Hopper", initials: "GH" },
  { name: "Henry Ford", initials: "HF" },
]

people.each do |attrs|
  Person.find_or_create_by!(name: attrs[:name]) do |p|
    p.initials = attrs[:initials]
  end
end

puts "Seeded #{Person.count} people"
