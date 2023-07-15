const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheatres: Boolean!
  }

  type Query {
    users: [User!]!
    # users: UsersResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: updateUsernameInput!): User
    deleteUserByID(id: ID!): User
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA # default types
    # friends: [CreateUserInput]
    # favouriteMovies: [CreateMovieInput]
  }

  input CreateMovieInput {
    name: String!
    yearOfPublication: Int!
    isInTheatres: Boolean!
  }

  input updateUsernameInput {
    id: ID!
    newUsername: String!
  }

  enum Nationality {
    AFGHANISTAN
    ALBANIA
    ALGERIA
    ANDORRA
    ANGOLA
    ANTIGUA_AND_BARBUDA
    ARGENTINA
    ARMENIA
    AUSTRALIA
    AUSTRIA
    AZERBAIJAN
    BAHAMAS
    BAHRAIN
    BANGLADESH
    BARBADOS
    BELARUS
    BELGIUM
    BELIZE
    BENIN
    BHUTAN
    BOLIVIA
    BOSNIA_AND_HERZEGOVINA
    BOTSWANA
    BRAZIL
    BRUNEI
    BULGARIA
    BURKINA_FASO
    BURUNDI
    CAMBODIA
    CAMEROON
    CANADA
    CAPE_VERDE
    CENTRAL_AFRICAN_REPUBLIC
    CHAD
    CHILE
    CHINA
    COLOMBIA
    COMOROS
    CONGO
    COSTA_RICA
    CROATIA
    CUBA
    CYPRUS
    CZECH_REPUBLIC
    DEMOCRATIC_REPUBLIC_OF_THE_CONGO
    DENMARK
    DJIBOUTI
    DOMINICA
    DOMINICAN_REPUBLIC
    EAST_TIMOR
    ECUADOR
    EGYPT
    EL_SALVADOR
    EQUATORIAL_GUINEA
    ERITREA
    ESTONIA
    ESWATINI
    ETHIOPIA
    FIJI
    FINLAND
    FRANCE
    GABON
    GAMBIA
    GEORGIA
    GERMANY
    GHANA
    GREECE
    GRENADA
    GUATEMALA
    GUINEA
    GUINEA_BISSAU
    GUYANA
    HAITI
    HONDURAS
    HUNGARY
    ICELAND
    INDIA
    INDONESIA
    IRAN
    IRAQ
    IRELAND
    ISRAEL
    ITALY
    JAMAICA
    JAPAN
    JORDAN
    KAZAKHSTAN
    KENYA
    KIRIBATI
    NORTH_KOREA
    SOUTH_KOREA
    KOSOVO
    KUWAIT
    KYRGYZSTAN
    LAOS
    LATVIA
    LEBANON
    LESOTHO
    LIBERIA
    LIBYA
    LIECHTENSTEIN
    LITHUANIA
    LUXEMBOURG
    MADAGASCAR
    MALAWI
    MALAYSIA
    MALDIVES
    MALI
    MALTA
    MARSHALL_ISLANDS
    MAURITANIA
    MAURITIUS
    MEXICO
    MICRONESIA
    MOLDOVA
    MONACO
    MONGOLIA
    MONTENEGRO
    MOROCCO
    MOZAMBIQUE
    MYANMAR
    NAMIBIA
    NAURU
    NEPAL
    NETHERLANDS
    NEW_ZEALAND
    NICARAGUA
    NIGER
    NIGERIA
    NORTH_MACEDONIA
    NORWAY
    OMAN
    PAKISTAN
    PALAU
    PALESTINE
    PANAMA
    PAPUA_NEW_GUINEA
    PARAGUAY
    PERU
    PHILIPPINES
    POLAND
    PORTUGAL
    QATAR
    ROMANIA
    RUSSIA
    RWANDA
    SAINT_KITTS_AND_NEVIS
    SAINT_LUCIA
    SAINT_VINCENT_AND_THE_GRENADINES
    SAMOA
    SAN_MARINO
    SAO_TOME_AND_PRINCIPE
    SAUDI_ARABIA
    SENEGAL
    SERBIA
    SEYCHELLES
    SIERRA_LEONE
    SINGAPORE
    SLOVAKIA
    SLOVENIA
    SOLOMON_ISLANDS
    SOMALIA
    SOUTH_AFRICA
    SOUTH_SUDAN
    SPAIN
    SRI_LANKA
    SUDAN
    SURINAME
    SWEDEN
    SWITZERLAND
    SYRIA
    TAIWAN
    TAJIKISTAN
    TANZANIA
    THAILAND
    TOGO
    TONGA
    TRINIDAD_AND_TOBAGO
    TUNISIA
    TURKEY
    TURKMENISTAN
    TUVALU
    UGANDA
    UKRAINE
    UNITED_ARAB_EMIRATES
    UNITED_KINGDOM
    UNITED_STATES
    URUGUAY
    UZBEKISTAN
    VANUATU
    VATICAN_CITY
    VENEZUELA
    VIETNAM
    YEMEN
    ZAMBIA
    ZIMBABWE
  }

  # return type for when the Users query is successfully executed
  type UserSuccessfulResult {
    users: [User!]!
  }

  # return type for when the Users query fails
  type UserErrorResult {
    message: String!
  }

  # this union represents all possible results after executing the users query -> either success or error
  union UsersResult = UserSuccessfulResult | UserErrorResult
`

module.exports = { typeDefs }
