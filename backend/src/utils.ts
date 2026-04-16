export const isValidPrompt = (prompt: string) => {
  if (!prompt) return false;

  const trimmed = prompt.trim().toLowerCase();

  if (trimmed.length < 3 || trimmed.length > 200) return false;

  // reject obvious garbage
  if (!/[aeiou]/.test(trimmed)) return false;

  // reject short nonsense
  if (/^[a-z]{1,4}$/.test(trimmed)) return false;

  //  allow natural sentences
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount >= 3) return true;

const intentKeywords = [
  // actions
  "add", "remove", "change", "modify", "update", "replace", "edit",
  "adjust", "improve", "optimize", "customize", "personalize",

  // regeneration
  "regenerate", "redo", "recreate", "replan", "new", "different",

  // destination / switching
  "destination", "place", "location", "city", "country",
  "go to", "travel to", "visit place",
  "different place", "another place", "new place",
  "change destination", "switch destination", "choose destination",
  "pick place", "select location",

  // trip context
  "trip", "itinerary", "day", "plan", "schedule",
  "route", "travel plan",

  // preferences
  "more", "less", "focus", "include", "avoid",
  "increase", "decrease",

  // vibe / experience (VERY IMPORTANT)
  "fun", "exciting", "interesting", "unique",
  "relaxing", "peaceful", "calm", "quiet",
  "romantic", "couple", "honeymoon",
  "family", "kids", "solo", "friends",
  "luxury", "luxurious", "premium",
  "budget", "budget-friendly", "cheap", "affordable",
  "expensive", "comfortable", "cozy",
  "crowded", "less crowded",

  // discovery / exploration
  "hidden gems", "offbeat", "underrated",
  "popular", "must visit", "top places",
  "best places", "famous spots",
  "local experience", "authentic",
  "tourist places", "landmarks",

  // activities / interests
  "food", "street food", "restaurants", "cafe", "cafes",
  "bars", "clubs", "nightlife",
  "shopping", "markets", "mall",
  "museums", "history", "culture", "art",
  "music", "festival",
  "nature", "parks", "wildlife",
  "beach", "mountains", "hiking", "trekking",
  "adventure", "outdoor", "indoor",
  "activities", "things to do",

  // time-based
  "day", "morning", "afternoon", "evening", "night",
  "weekend", "short trip", "long trip",
  "first day", "last day",

  "make it", 
  "i want", 
  "i prefer", 
  "can you", 
  "something like", 
  "not too", 
  "more like", 
  "less like",
  "better options",
  "any suggestions"
];

  return intentKeywords.some(k => trimmed.includes(k));
};