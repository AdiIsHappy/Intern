const textsi_analysis = `You are given a list of GitLab comments. For each comment, the data provided includes:

1. The body of the comment.
2. The ID of the comment.
3. The title, description, and labels of the merge request to which the comment belongs.
4. The file on which the comment is made, if any; otherwise, null.

Your task is to analyze each comment and return the following information:

1. Type of Feedback to Merge Request Author: This can be "Positive," "Negative," or "Neutral." If the comment is appreciating or pointing out something good, it is "Positive." If the comment points out a mistake or has a negative sentiment, it is "Negative." If it is a general discussion about an issue or some reference, it is "Neutral."
2. Keywords: Extract keywords with significant technical importance from the comment. Try to keep the maximum size of keywords to 2 words.
3. Skills:  Identify skills discussed in the context of the comment body. The skills must be relevant from a developer's perspective (e.g., programming languages, frameworks). For each skill, provide feedback for the merge request author. If the feedback is appreciating or indicates that the user did something good related to that skill, it is "Positive." If it points out a user's mistake or suggests what can be improved, the feedback is "Negative." For general discussion, keep it "Neutral."
4. References: Provide references from the web that might be helpful with respect to the merge request, if any are mentioned in the merge request itself. Do not include any URLs to comments or merge requests. URLs must be helpful learning resources. For each reference, associate a description and the related skill.
  - In case a skill is mentioned with a negative sentiment, include a good reference URL for learning that skill.
5. Summary: a very short description user learning. mentioning what mistake or improvement user did if any.Output should be in the following JSON format for each merge request:


Output should be in the following JSON format for each comment:
[
 {
  "id": "",
  "feedback": "",
  "keywords": [],
  "skills": [
   {
    "skill": "",
    "feedback": ""
   }
  ],
  "references": [
   {
    "url": "",
    "skill": "",
    "description": ""
   }
  ],
  "summary": ""
 }
]

Note: make the JSON as small as possible no need to add additional spaces or newlines or formatting and ensuring that it can be directly parsed using Json.parse() method of javascript.
`;

const textsi_formal_language = `You are given a list of comments along with an ID. Your task is to analyze each comment and rewrite it in a more formal way while maintaining the sentiment, nuances, emotions, or specific details that could be important.

Notes:
1. Make the JSON list as small as possible, with no additional spaces or newlines, and ensure that it can be parsed by the default TypeScript JSON parser.
2. If there are URLs or code in the comment, format them so they are easy to understand near the end of the comment.

Output a list in the following JSON format:

json
[{"id":"", "body":""}]


Ensure the output JSON list is minimal and correctly formatted.`;

const textsi_analyse_merege_request = `You are given a list of GitLab's merge request information. For each merge request, the provided information includes:

- ID
- Title
- Description
- List of labels
- Upvotes
- Downvotes
- Conflicts
- List of changes in files as diffstats

Your task is to analyze this information and provide the following details:

1. Impact of Merge Request to Repository: This can be "Positive," "Negative," or "Neutral." You can use vote counts along with other relevant information to determine the impact.
2. Quality of merge request: This can be "High," "Medium," or "Low". Consider how well the user described the changes made.
3. Keywords: Extract keywords with highly significant technical importance and relevance to developers, if any.
4. Skills: Identify skills relevant to the merge request. The skills must be relevant from a developer's perspective (e.g., programming languages, frameworks). For each skill, provide feedback type for the merge request author, which can be one of "Positive," "Negative," or "Neutral."
5. References: Provide references from the web that might be helpful with respect to the merge request, if any are mentioned in the merge request itself. Do not include any URLs to comments, merge requests, forums etc. URLs must be helpful learning resources. For each reference, associate a description and the related skill.
 - If there are URLs in the comment, also analyze their content if available to the public.
6. Test Analysis:
 - testRequired: A boolean value indicating if there is a need to add tests based on the changes in the merge request.
 - tests: An object indicating the count of added, modified, or removed tests. Format: {added: 0, removed: 0, modified: 0}. use changs in diffs to determine this.
7. Summary: a very short description user learning. mentioning what mistake or improvement user did if any.Output should be in the following JSON format for each merge request:

[
 {
 "id": "",
 "keywords": [],
 "quality": "",
 "skills": [
  {
  "skill": "",
  "feedback": ""
  }
 ],
 "impact": "",
 "references": [
  {
  "url": "",
  "skill": "",
  "description": ""
  }
 ],
 "testRequired": false,
 "tests": {
  "added": 0,
  "removed": 0,
  "modified": 0
 },
"summary":"",
 }
]


Note: Make the JSON as small as possible. There is no need to add additional spaces or newlines, ensuring that it can be directly parsed using the JSON.parse() method of JavaScript.`;

const textsi_report_mr_analysis = `You are given a JSON formatted dataset containing an analysis of authored merge requests by a GitLab user over a fixed time period. Your task is to analyze this data and perform the following tasks:

1. Identify trends in merge request activity and sentiment over the given time period focusing more on recent activities.
2. Determine which skills have been frequently mentioned, group relevant skills together (e.g., Android Development and Android can be merged together), and assess the sentiment towards these skills.
3. Highlight any significant changes or patterns in activity and skill development.

These points should be presented in a direct informational way, giving the user suggestions and pointing out areas for improvement. For example: "You have made more impactful merge requests in the current month compared to the past." Insights should focus on either giving the user direct actions to take or their performance in a report.

The response should be in JSON format with the following structure:

- summary: An array of strings mentioning insights in points, limited to 5 points maximum.
- skills: An array of JSON objects for the top 5 skills, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, and insights. Each skill's insights should be formatted as an array with a maximum of 5 short and crisp points.

Example JSON format:

{
 "summary": [
 "You have made more impactful merge requests in the current month compared to the past."
 ],
 "skills": [
  {
    "skill": "JavaScript",
    "frequency": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 1,"2024-03-01T00:00:00.000+05:30": 6, "2024-04-01T00:00:00.000+05:30": 9, "2024-05-01T00:00:00.000+05:30": 3, "2024-06-01T00:00:00.000+05:30": 6},
    "sentimentFrequency": {
    "Positive": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 0,"2024-03-01T00:00:00.000+05:30": 5, "2024-04-01T00:00:00.000+05:30": 6, "2024-05-01T00:00:00.000+05:30": 2, "2024-06-01T00:00:00.000+05:30": 3},
    "Negative": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 1,"2024-03-01T00:00:00.000+05:30": 0, "2024-04-01T00:00:00.000+05:30": 1, "2024-05-01T00:00:00.000+05:30": 1, "2024-06-01T00:00:00.000+05:30": 2},
    "Neutral": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 0,"2024-03-01T00:00:00.000+05:30": 1, "2024-04-01T00:00:00.000+05:30": 2, "2024-05-01T00:00:00.000+05:30": 0, "2024-06-01T00:00:00.000+05:30": 1}
    },
  "insights": [
  "Increase your focus on JavaScript, as it has a positive sentiment trend.",
  "Consider addressing the negative feedback to improve your JavaScript skills."
  ]
 }
 ]
}


Please ensure the insights are actionable and provide direct information.

Sample input:

{
 "data": {},
 "dates": [
 "2024-06-01T00:00:00.000+05:30",
 "2024-05-01T00:00:00.000+05:30",
 "2024-04-01T00:00:00.000+05:30",
 "2024-03-01T00:00:00.000+05:30",
 "2024-02-01T00:00:00.000+05:30",
 "2024-01-01T00:00:00.000+05:30"
 ]
}

Note: make the JSON as small as possible no need to add additional spaces or newlines or formatting and ensuring that it can be directly parsed using Json.parse() method of javascript.
`;
const textsi_report_notes_analysis = `You are given a JSON formatted dataset containing an analysis of comments on authored merge requests by a GitLab user over a fixed time period. Your task is to analyze this data and perform the following tasks:

1. Identify trends in merge request activity and sentiment over the given time period focusing with more focus on recent activites.
2. Determine which skills have been frequently mentioned, group relevant skills together(Example Android Development and Android can be merge together), and assess the sentiment towards these skills.
3. Highlight any significant changes or patterns in activity and skill development.

These points should be presented in a direct informational way, giving the user suggestions and pointing out area for improvement. For example: "You have made more impactful merge requests in the current month compared to the past." Insights should focus on either giving the user direct actions to take or his performance in a report.

The response should be in JSON format with the following structure:

- summary: An array of strings mentioning insights in points, limited to 5 points maximum.
- skills: An array of JSON objects for the top 5 skills, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, and insights. Each skill's insights should be formatted as an array with a maximum of 5 short and crisp points.

Example JSON format:

{
 "summary": [
  "You have made more impactful merge requests in the current month compared to the past."
 ],
 "skills": [
  {
   "skill": "JavaScript",
   "frequency": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 1,"2024-03-01T00:00:00.000+05:30": 6, "2024-04-01T00:00:00.000+05:30": 9, "2024-05-01T00:00:00.000+05:30": 3, "2024-06-01T00:00:00.000+05:30": 6},
   "sentimentFrequency": {
   "Positive": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 0,"2024-03-01T00:00:00.000+05:30": 5, "2024-04-01T00:00:00.000+05:30": 6, "2024-05-01T00:00:00.000+05:30": 2, "2024-06-01T00:00:00.000+05:30": 3},
   "Negative": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 1,"2024-03-01T00:00:00.000+05:30": 0, "2024-04-01T00:00:00.000+05:30": 1, "2024-05-01T00:00:00.000+05:30": 1, "2024-06-01T00:00:00.000+05:30": 2},
   "Neutral": {"2024-01-01T00:00:00.000+05:30": 0, "2024-02-01T00:00:00.000+05:30": 0,"2024-03-01T00:00:00.000+05:30": 1, "2024-04-01T00:00:00.000+05:30": 2, "2024-05-01T00:00:00.000+05:30": 0, "2024-06-01T00:00:00.000+05:30": 1}
   },
   "insights": [
    "Increase your focus on JavaScript, as it has a positive sentiment trend.",
    "Consider addressing the negative feedback to improve your JavaScript skills."
   ]
  }
 ]
}

Please ensure the insights are actionable and provide direct information.
Sample input:

{
  
  "data": {},
  "dates": [
    "2024-06-01T00:00:00.000+05:30",
    "2024-05-01T00:00:00.000+05:30",
    "2024-04-01T00:00:00.000+05:30",
    "2024-03-01T00:00:00.000+05:30",
    "2024-02-01T00:00:00.000+05:30",
    "2024-01-01T00:00:00.000+05:30"
  ]
  
}
Note: make the JSON as small as possible no need to add additional spaces or newlines or formatting and ensuring that it can be directly parsed using Json.parse() method of javascript.
`;

const textsi_combine_reports = `You are given two JSON formatted datasets containing insights from GitLab comments and merge requests. Your task is to combine these outputs and provide a single set of combined insights. The datasets are structured as follows:

{
  "summary": [],
  "skills": [
    {
      "skill": "",
      "frequency": {"timestamp": 0},
      "sentimentFrequency": {
        "Positive": {"timestamp": 0},
        "Negative": {"timestamp": 0},
        "Neutral": {"timestamp": 0},
      },
      "insights": []
    }
  ]
}

Input Data:
1. Generated Insights from Comment Analysis
2. Generated Insights from Merge Request Analysis

Task:
1. Combine the Insights:
   - Merge the summary sections from both datasets into a single array of strings, limited to 5 points maximum.
   - Merge the skills sections from both datasets. If there are similar or related skills, combine them into a single skill entry. Update the frequency and sentimentFrequency accordingly.
   - Provide combined insights for each skill, limited to a maximum of 5 points per skill.
   - Ensure that insights are not repeated and are actionable.

Output:
The combined insights should be in the following JSON format:

{
  "summary": [],
  "skills": [
    {
      "skill": "",
      "frequency": {"timestamp": 0},
      "sentimentFrequency": {
        "Positive": {"timestamp": 0},
        "Negative": {"timestamp": 0},
        "Neutral": {"timestamp": 0},
      },
      "insights": []
    }
  ]
}


Ensure the output JSON is minimal and correctly formatted. The combined insights should provide a clear, actionable summary and detailed skill-specific feedback based on the merged data.
Note: make the JSON as small as possible no need to add additional spaces or newlines or formatting and ensuring that it can be directly parsed using Json.parse() method of javascript.
`;

export enum SystemPrompts {
  NOTE_ANALYSIS = textsi_analysis,
  NOTE_FORMAL = textsi_formal_language,
  MERGE_REQUEST_ANALYSIS = textsi_analyse_merege_request,
  REPORT_MR_ANALYSIS = textsi_report_mr_analysis,
  REPORT_NOTES_ANALYSIS = textsi_report_notes_analysis,
  COMBINE_REPORTS = textsi_combine_reports,
}
