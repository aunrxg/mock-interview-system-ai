export const Jobs = [
    {
      "id": "job1",
      "title": "Frontend Engineer",
      "company": "Google",
      "description": "Design and implement responsive UI features for scalable web applications.",
      "location": "San Francisco, CA",
      "type": "Full-time",
      "skills": ["React", "TypeScript", "CSS"], 
      "question": {
        "title": "Two Sum",
        "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
        "constraints": [
          "Each input would have exactly one solution.",
          "You may not use the same element twice."
        ],
        "testCases": [
          {
            "input": "[2, 7, 11, 15], 9",
            "expectedOutput": "[0, 1]",
            "explanation": "2 + 7 = 9"
          },
          {
            "input": "[3, 2, 4], 6",
            "expectedOutput": "[1, 2]",
            "explanation": "2 + 4 = 6"
          }
        ],
        "difficulty": "Easy",
        "tags": ["Array", "Hash Table"]
      }
    },
    {
      "id": "job2",
      "title": "Backend Developer",
      "company": "Amazon",
      "description": "Build scalable microservices and APIs to power backend logic for high traffic applications.",
      "location": "New York, NY",
      "type": "Full-time",
      "skills": ["Node.js", "Python", "MongoDB"],
      "question": {
        "title": "Valid Parentheses",
        "description": "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        "constraints": [
          "An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order."
        ],
        "testCases": [
          {
            "input": "\"()[]{}\"",
            "expectedOutput": "true",
            "explanation": "All brackets are closed in correct order."
          },
          {
            "input": "\"(]\"",
            "expectedOutput": "false",
            "explanation": "Mismatched brackets."
          }
        ],
        "difficulty": "Easy",
        "tags": ["Stack", "String"]
      }
    },
    {
      "id": "job3",
      "title": "Full Stack Developer",
      "company": "Microsoft",
      "description": "Work across the stack to build performant web applications and services.",
      "location": "Remote",
      "type": "Contract",
      "skills": ["React", "Node.js", "PostgreSQL"],
      "question": {
        "title": "Longest Substring Without Repeating Characters",
        "description": "Given a string, find the length of the longest substring without repeating characters.",
        "constraints": [
          "0 <= s.length <= 5 * 10^4",
          "s consists of English letters, digits, symbols and spaces."
        ],
        "testCases": [
          {
            "input": "\"abcabcbb\"",
            "expectedOutput": "3",
            "explanation": "The answer is 'abc', with the length of 3."
          },
          {
            "input": "\"bbbbb\"",
            "expectedOutput": "1",
            "explanation": "The answer is 'b', with the length of 1."
          }
        ],
        "difficulty": "Medium",
        "tags": ["Hash Table", "Sliding Window", "String"]
      }
    },
    {
      "id": "job4",
      "title": "DevOps Engineer",
      "company": "Netflix",
      "description": "Design and maintain ETL pipelines and ensure high performance of data flow systems.",
      "location": "Seattle, WA",
      "type": "Full-time",
      "skills": ["AWS", "Docker", "Kubernetes"], 
      "question": {
        "title": "Top K Frequent Elements",
        "description": "Given a non-empty array of integers, return the k most frequent elements.",
        "constraints": [
          "You may assume k is always valid, 1 <= k <= number of unique elements."
        ],
        "testCases": [
          {
            "input": "[1,1,1,2,2,3], 2",
            "expectedOutput": "[1, 2]",
            "explanation": "1 appears 3 times, 2 appears 2 times."
          },
          {
            "input": "[1], 1",
            "expectedOutput": "[1]",
            "explanation": "Only one element exists."
          }
        ],
        "difficulty": "Medium",
        "tags": ["Heap", "Hash Table", "Sorting"]
      }
    },
    {
      "id": "job5",
      "title": "Machine Learning Engineer",
      "company": "OpenAI",
      "description": "Research and deploy machine learning algorithms into production AI systems.",
      "location": "Austin, TX",
      "type": "Full-time",
      "skills": ["Python", "TensorFlow", "SQL"], 
      "question": {
        "title": "Median of Two Sorted Arrays",
        "description": "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
        "constraints": [
          "The overall run time complexity should be O(log (m+n))."
        ],
        "testCases": [
          {
            "input": "[1, 3], [2]",
            "expectedOutput": "2.0",
            "explanation": "Merged array is [1, 2, 3]. Median is 2."
          },
          {
            "input": "[1, 2], [3, 4]",
            "expectedOutput": "2.5",
            "explanation": "Merged array is [1, 2, 3, 4]. Median is (2 + 3) / 2 = 2.5."
          }
        ],
        "difficulty": "Hard",
        "tags": ["Binary Search", "Array", "Divide and Conquer"]
      }
    }
]
  