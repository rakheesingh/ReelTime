export const movieFilterData = {
    "Genres":{
      type: "buttonCheckbox",
      requestParam: ["with_genres"],
      isMultiple: true,
      checkBoxData:{
        ACTION: "28",
        ADVERNTURE: "12",
        ANIMATION: "16",
        COMEDY:"35",
        HORROR:"27"
      }
    },
    "Keywords":{
         type: "input",
         requestParam: ["with_keywords"],
    },

    "Userscore":
    {
        type: "progressBar",
        requestParam: ["vote_average.lte", "vote_average.gte"],
        minValue:0,
        maxValue: 10,
    }
}