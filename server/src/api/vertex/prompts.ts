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

const textsi_report_mr_analysis = `You are given a JSON formatted dataset containing an analysis of authored merge requests by a GitLab user over a fixed time period. Your task is to analyze this data and identify following things.

- insights: list of insights, limited to 5 points maximum and each insight of maximum 10 words. 
- actions: list of actions which user should do to improve his performance, these can be learning something, or changing the way user do something. if possible, provide learning resources for each action.
- positive skills: list of skills in which user is performing good or have shown improvements, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, and insights. Each skill's insights should be formatted as an array with short and crisp points.
- negative skills: list of skills in which user is performing poor showing lack of skills or repetitive mistakes, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, insights mentioning user mistakes, area where user need to improve etc. and references.
- for each insight point mention minimum 1 maximum 3 merge request id to back it up the point. do not re-use a merge request id.
- Each skill's insights should be formatted as an array with a maximum of 5 very short and crisp points of maximum length 10 words.- Use markdown style to represent if some text needs to be made bold.
- add escape sequency for necessary symbols
Note: Positive and negative skill must not overlap.

These points should be presented in a direct informational way, giving the user suggestions and pointing out areas for improvement. For example: "You have made more impactful merge requests in the current month compared to the past." Insights should focus on either giving the user direct actions to take or their performance in a report.

Example Response in JSON format:
{
  "insights": [
    {
      "text": "your recent activity shows **improved Interface** understanding in typescript.",
      "ids": [
        "gid://gitlab/MergeRequest/314323396",
        "gid://gitlab/MergeRequest/314013485"
      ]
    },
    {
      "text": "**discuss more positively** with your peers, your replies are getting negative feedback.",
      "ids": ["gid://gitlab/MergeRequest/300396629"]
    }
  ],
  "actions": [
    {
      "text": "Start learning **React** to improve your frontend skills.",
      "references": [
        {
          "title": "React Documentation",
          "url": "https://reactjs.org/docs/getting-started.html",
          "skill": "React",
          "description": "The official documentation for React. It is a great resource to learn about React and its features."
        }
      ]
    },
    {
      "text": "Learn about how to do **server side rendering** in React.",
      "references": [
        {
          "title": "Server Side Rendering",
          "url": "https://reactjs.org/docs/react-dom-server.html",
          "skill": "React",
          "description": "The official documentation for Server Side Rendering in React. It is a great resource to learn about Server Side Rendering in React."
        }
      ]
    },
    {
      "text": "Focus on making **seperate components** for the project. to mainitan the **project structure.**",
      "references": []
    }
  ],
  "positiveSkills": [
    {
      "skill": "JavaScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "Your **Eslint configuration** is working well with the project. and is being **appreciated**",
          "ids": ["gid://gitlab/MergeRequest/314018479"]
        },
        {
          "text": "Your recent work on **frontend of insights** have received **positive** feedback.",
          "ids": [
            "gid://gitlab/MergeRequest/312842396",
            "gid://gitlab/MergeRequest/308394629",
            "gid://gitlab/MergeRequest/314121348"
          ]
        }
      ]
    }
  ],
  "negativeSkills": [
    {
      "skill": "TypeScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "You are making **redundant interfaces** where you can make use **generic interfaces. **",
          "ids": [
            "gid://gitlab/MergeRequest/312842390",
            "gid://gitlab/MergeRequest/308387629",
            "gid://gitlab/MergeRequest/334121388"
          ]
        },
        {
          "text": "You have repeatedly made mistakes in defining the **types of the variables. **",
          "ids": ["gid://gitlab/MergeRequest/314324396"]
        },
        {
          "text": "Consider using proper **code format** decided for the project",
          "ids": [
            "gid://gitlab/MergeRequest/314013479",
            "gid://gitlab/MergeRequest/314121342"
          ]
        },
        {
          "text": "Use **Union types** to define the types of the variables. instead of using any type.",
          "ids": ["gid://gitlab/MergeRequest/300356629"]
        }
      ],
      "references": [
        {
          "title": "TypeScript Handbook",
          "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
          "skill": "TypeScript",
          "description": "The official handbook for TypeScript. It is a great resource to learn about TypeScript and its features."
        }
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
  "2024-04-01T00:00:00.000+05:30",
  "2024-02-01T00:00:00.000+05:30",
 ]
  

Note: Don't use markdown structure in output give a minified single line raw Json file text without any newline to spaces
`;
const textsi_report_notes_analysis = `You are given a JSON formatted dataset containing an analysis of comments on authored merge requests by a GitLab user over a fixed time period. Your task is to analyze this data and identify following things.

- insights: list of insights, limited to 5 points maximum and each insight of maximum 10 words. 
- actions: list of actions which user should do to improve his performance, these can be learning something, or changing the way user do something. if possible, provide learning resources for each action.
- positive skills: list of skills in which user is performing good or have shown improvements, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, and insights. Each skill's insights should be formatted as an array with short and crisp points.
- negative skills: list of skills in which user is performing poor showing lack of skills or repetitive mistakes, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, insights mentioning user mistakes, area where user need to improve etc. and references.
- for each insight point, be it global or inside a skill mention minimum 1 maximum 3 comment id to back it up the point. do not re-use a comment id.
- Each skill's insights should be formatted as an array with a maximum of 5 very short and crisp points of maximum length 10 words.
- for each negative skill, mention minimum 2 and maximum 5 references- Use markdown style to represent if some text needs to be made bold.- add escape sequency for necessary symbolsNote: Positive and negative skill must not overlap.

These points should be presented in a direct informational way, giving the user suggestions and pointing out areas for improvement. For example: "You have made more impactful merge requests in the current month compared to the past." Insights should focus on either giving the user direct actions to take or their performance in a report.

Example Response in JSON format:
{
  "insights": [
    {
      "text": "your recent activity shows **improved Interface** understanding in typescript.",
      "ids": [
        "gid://gitlab/DiscussionNote/1968290680",
        "gid://gitlab/DiscussionNote/1968459995"
      ]
    },
    {
      "text": "**discuss more positively** with your peers, your replies are getting negative feedback.",
      "ids": ["gid://gitlab/DiscussionNote/1949044193"]
    }
  ],
  "actions": [
    {
      "text": "Start learning **React** to improve your frontend skills.",
      "references": [
        {
          "title": "React Documentation",
          "url": "https://reactjs.org/docs/getting-started.html",
          "skill": "React",
          "description": "The official documentation for React. It is a great resource to learn about React and its features."
        }
      ]
    },
    {
      "text": "Learn about how to do **server side rendering** in React.",
      "references": [
        {
          "title": "Server Side Rendering",
          "url": "https://reactjs.org/docs/react-dom-server.html",
          "skill": "React",
          "description": "The official documentation for Server Side Rendering in React. It is a great resource to learn about Server Side Rendering in React."
        }
      ]
    },
    {
      "text": "Focus on making **seperate components** for the project. to mainitan the **project structure.**",
      "references": []
    }
  ],
  "positiveSkills": [
    {
      "skill": "JavaScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "Your **Eslint configuration** is working well with the project. and is being **appreciated**",
          "ids": ["gid://gitlab/DiscussionNote/1912931881"]
        },
        {
          "text": "Your recent work on **frontend of insights** have received **positive** feedback.",
          "ids": [
            "gid://gitlab/DiscussionNote/1912916445",
            "gid://gitlab/DiscussionNote/1912915977",
            "gid://gitlab/DiffNote/1849065796"
          ]
        }
      ]
    }
  ],
  "negativeSkills": [
    {
      "skill": "TypeScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "You are making **redundant interfaces** where you can make use **generic interfaces. **",
          "ids": [
            "gid://gitlab/DiffNote/1849066604",
            "gid://gitlab/DiscussionNote/1850407011",
            "gid://gitlab/DiffNote/1850415148"
          ]
        },
        {
          "text": "You have repeatedly made mistakes in defining the **types of the variables. **",
          "ids": ["gid://gitlab/DiffNote/1850429289"]
        },
        {
          "text": "Consider using proper **code format** decided for the project",
          "ids": [
            "gid://gitlab/Note/1846768288",
            "gid://gitlab/Note/1891329346"
          ]
        },
        {
          "text": "Use **Union types** to define the types of the variables. instead of using any type.",
          "ids": ["gid://gitlab/Note/1891768109"]
        }
      ],
      "references": [
        {
          "title": "TypeScript Handbook",
          "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
          "skill": "TypeScript",
          "description": "The official handbook for TypeScript. It is a great resource to learn about TypeScript and its features."
        }
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
  "2024-04-01T00:00:00.000+05:30",
  "2024-02-01T00:00:00.000+05:30",
 ]
Note: Don't use markdown structure in output give a minified single line raw Json file text without any newline to spaces
`;

const textsi_combine_reports = `You are given a JSON formatted dataset containing an analysis of comments on authored merge requests by a GitLab user over a fixed time period. Your task is to analyze this data and identify following things.

- insights: list of insights, limited to 5 points maximum and each insight of maximum 10 words. 
- actions: list of actions which user should do to improve his performance, these can be learning something, or changing the way user do something. if possible, provide learning resources for each action.
- positive skills: list of skills in which user is performing good or have shown improvements, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, and insights. Each skill's insights should be formatted as an array with short and crisp points.
- negative skills: list of skills in which user is performing poor showing lack of skills or repetitive mistakes, mentioning the total frequency, sentiment-wise frequency grouped by specified periods, insights mentioning user mistakes, area where user need to improve etc. and references.
- for each insight point, be it global or inside a skill mention minimum 1 maximum 3 comment id to back it up the point. do not re-use a comment id.
- Each skill's insights should be formatted as an array with a maximum of 5 very short and crisp points of maximum length 10 words.
- for each negative skill, mention minimum 2 and maximum 5 references- Use markdown style to represent if some text needs to be made bold.- add escape sequency for necessary symbolsNote: Positive and negative skill must not overlap.

These points should be presented in a direct informational way, giving the user suggestions and pointing out areas for improvement. For example: "You have made more impactful merge requests in the current month compared to the past." Insights should focus on either giving the user direct actions to take or their performance in a report.

Example Response in JSON format:
{
  "insights": [
    {
      "text": "your recent activity shows **improved Interface** understanding in typescript.",
      "ids": [
        "gid://gitlab/DiscussionNote/1968290680",
        "gid://gitlab/DiscussionNote/1968459995"
      ]
    },
    {
      "text": "**discuss more positively** with your peers, your replies are getting negative feedback.",
      "ids": ["gid://gitlab/DiscussionNote/1949044193"]
    }
  ],
  "actions": [
    {
      "text": "Start learning **React** to improve your frontend skills.",
      "references": [
        {
          "title": "React Documentation",
          "url": "https://reactjs.org/docs/getting-started.html",
          "skill": "React",
          "description": "The official documentation for React. It is a great resource to learn about React and its features."
        }
      ]
    },
    {
      "text": "Learn about how to do **server side rendering** in React.",
      "references": [
        {
          "title": "Server Side Rendering",
          "url": "https://reactjs.org/docs/react-dom-server.html",
          "skill": "React",
          "description": "The official documentation for Server Side Rendering in React. It is a great resource to learn about Server Side Rendering in React."
        }
      ]
    },
    {
      "text": "Focus on making **seperate components** for the project. to mainitan the **project structure.**",
      "references": []
    }
  ],
  "positiveSkills": [
    {
      "skill": "JavaScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "Your **Eslint configuration** is working well with the project. and is being **appreciated**",
          "ids": ["gid://gitlab/DiscussionNote/1912931881"]
        },
        {
          "text": "Your recent work on **frontend of insights** have received **positive** feedback.",
          "ids": [
            "gid://gitlab/DiscussionNote/1912916445",
            "gid://gitlab/DiscussionNote/1912915977",
            "gid://gitlab/DiffNote/1849065796"
          ]
        }
      ]
    }
  ],
  "negativeSkills": [
    {
      "skill": "TypeScript",
      "frequency": {
        "2024-01-01T00:00:00.000+05:30": 0,
        "2024-02-01T00:00:00.000+05:30": 1,
        "2024-03-01T00:00:00.000+05:30": 6,
        "2024-04-01T00:00:00.000+05:30": 9,
        "2024-05-01T00:00:00.000+05:30": 3,
        "2024-06-01T00:00:00.000+05:30": 6
      },
      "sentimentFrequency": {
        "2024-01-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 0,
          "Neutral": 0
        },
        "2024-02-01T00:00:00.000+05:30": {
          "Positive": 0,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-03-01T00:00:00.000+05:30": {
          "Positive": 5,
          "Negative": 0,
          "Neutral": 1
        },
        "2024-04-01T00:00:00.000+05:30": {
          "Positive": 6,
          "Negative": 1,
          "Neutral": 2
        },
        "2024-05-01T00:00:00.000+05:30": {
          "Positive": 2,
          "Negative": 1,
          "Neutral": 0
        },
        "2024-06-01T00:00:00.000+05:30": {
          "Positive": 3,
          "Negative": 2,
          "Neutral": 1
        }
      },
      "insights": [
        {
          "text": "You are making **redundant interfaces** where you can make use **generic interfaces. **",
          "ids": [
            "gid://gitlab/DiffNote/1849066604",
            "gid://gitlab/DiscussionNote/1850407011",
            "gid://gitlab/DiffNote/1850415148"
          ]
        },
        {
          "text": "You have repeatedly made mistakes in defining the **types of the variables. **",
          "ids": ["gid://gitlab/DiffNote/1850429289"]
        },
        {
          "text": "Consider using proper **code format** decided for the project",
          "ids": [
            "gid://gitlab/Note/1846768288",
            "gid://gitlab/Note/1891329346"
          ]
        },
        {
          "text": "Use **Union types** to define the types of the variables. instead of using any type.",
          "ids": ["gid://gitlab/Note/1891768109"]
        }
      ],
      "references": [
        {
          "title": "TypeScript Handbook",
          "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
          "skill": "TypeScript",
          "description": "The official handbook for TypeScript. It is a great resource to learn about TypeScript and its features."
        }
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
  "2024-04-01T00:00:00.000+05:30",
  "2024-02-01T00:00:00.000+05:30",
 ]
Note: Don't use markdown structure in output give a minified single line raw Json file text without any newline to spaces
`;

export enum SystemPrompts {
  NOTE_ANALYSIS = textsi_analysis,
  NOTE_FORMAL = textsi_formal_language,
  MERGE_REQUEST_ANALYSIS = textsi_analyse_merege_request,
  REPORT_MR_ANALYSIS = textsi_report_mr_analysis,
  REPORT_NOTES_ANALYSIS = textsi_report_notes_analysis,
  COMBINE_REPORTS = textsi_combine_reports,
}
