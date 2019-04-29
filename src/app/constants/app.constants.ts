export class AppConstants {
  APP_URL = "https://shrouded-sea-98380.herokuapp.com";
  //APP_URL = "http://localhost:8000";
  GET_SECURITY_QUESTIONS_URL = "/api/user/getQuestions";
  GET_SECURITY_ANSWERS_URL = "/api/user/getAnswers";
  CREATE_USER_URL = "/api/user/create";
  LOGIN_USER_URL = "/api/user/verify";
  GET_ALL_MATCHES_URL = "/api/match/getAllMatches";
  GET_USER_MATCH_DETAIL_URL = "/api/match/otherMatchDetails";
  GET_PLAYERS_AVAILABILITY_URL = "/api/usersPlayers/getAvailability";
  SAVE_MATCH_PLAYERS_URL = "/api/match/saveOtherMatchDetails";
  CREATE_AVAILABILITY_URL = "/api/usersPlayers/createAvailability";
  GET_ALL_PLAYERS_URL = "/api/player/getAllPlayers";
  SAVE_PLAYERS_SCORES_URL = "/api/player/savePlayersScores";
}
