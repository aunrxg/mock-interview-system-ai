export const Jobs = [
  {
    "id": "job1",
    "title": "Frontend Engineer",
    "company": "Google",
    "location": "Remote",
    "type": "Full-time",
    "salary": "$120,000 - $150,000",
    "skills": ["React", "TypeScript", "HTML", "CSS", "Tailwind"],
    "description": "Join our UI/UX team to craft fast, accessible, and beautiful interfaces used by billions. You’ll collaborate closely with product and backend teams to design and build scalable features. This role emphasizes performance optimization, design systems, and responsiveness across all devices.",
    "responsibilities": [
      "Build and maintain high-performance front-end applications",
      "Collaborate with cross-functional teams to define and implement new features",
      "Ensure the technical feasibility of UI/UX designs",
      "Optimize components for maximum speed and scalability"
    ],
    "requirements": [
      "2+ years of experience in frontend development",
      "Strong knowledge of JavaScript/TypeScript and React",
      "Experience with modern CSS frameworks like Tailwind",
      "Familiarity with accessibility and performance best practices"
    ],
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
    "location": "Seattle, WA",
    "type": "Full-time",
    "salary": "$130,000 - $160,000",
    "skills": ["Node.js", "Express", "MongoDB", "AWS", "Docker"],
    "description": "As a backend engineer, you will develop core APIs and services that power our marketplace and internal tooling. You’ll focus on scalable architecture, API design, and data modeling, while ensuring fast and secure communication between services.",
    "responsibilities": [
      "Design and build RESTful APIs and microservices",
      "Implement authentication, caching, and background jobs",
      "Optimize queries and storage for performance",
      "Write unit and integration tests for services"
    ],
    "requirements": [
      "Strong experience with Node.js and MongoDB",
      "Good understanding of cloud infrastructure (AWS preferred)",
      "Familiarity with Docker and CI/CD pipelines",
      "Experience working in Agile environments"
    ],
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
    "location": "New York, NY",
    "type": "Contract",
    "salary": "$60/hour",
    "skills": ["React", "Node.js", "SQL", "GraphQL"],
    "description": "As a full stack engineer, you’ll work on product features end-to-end, from designing UI components to implementing backend services. You will help maintain our platform's code quality while contributing to both customer-facing and internal tools.",
    "responsibilities": [
      "Develop full-stack features from design to deployment",
      "Manage and optimize SQL/NoSQL data flows",
      "Implement testing and code review practices",
      "Participate in daily standups and sprint planning"
    ],
    "requirements": [
      "Experience with both frontend and backend stacks",
      "Proficient in JavaScript frameworks (React, Node)",
      "Experience building REST/GraphQL APIs",
      "Comfortable with SQL and version control systems"
    ],
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
    "title": "Data Engineer",
    "company": "Netflix",
    "location": "Remote",
    "type": "Full-time",
    "salary": "$140,000 - $170,000",
    "skills": ["Python", "Spark", "Kafka", "Airflow", "SQL"],
    "description": "We're hiring data engineers to build and maintain data pipelines that support real-time analytics and personalized recommendations. You'll work with massive data sets, optimize ETL jobs, and ensure data integrity across our streaming platform.",
    "responsibilities": [
      "Build scalable batch and streaming pipelines",
      "Develop and manage ETL processes with Airflow",
      "Monitor and improve data quality and latency",
      "Collaborate with analysts and data scientists"
    ],
    "requirements": [
      "Strong Python programming skills",
      "Experience with big data frameworks (Spark, Kafka)",
      "Familiarity with data modeling and warehouse concepts",
      "Ability to debug and optimize SQL queries"
    ],
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
    "location": "San Francisco, CA",
    "type": "Internship",
    "salary": "$6,000/month",
    "skills": ["Python", "PyTorch", "Transformers", "NLP"],
    "description": "We're looking for ML interns to help train and evaluate large-scale foundation models. You’ll participate in applied research and improve inference performance across cutting-edge deployments.",
    "responsibilities": [
      "Design experiments for model evaluation",
      "Fine-tune and benchmark language models",
      "Develop training and data preprocessing pipelines",
      "Analyze model behavior with metrics and visualizations"
    ],
    "requirements": [
      "Strong Python and ML fundamentals",
      "Experience with PyTorch or TensorFlow",
      "Familiarity with LLMs and NLP tasks",
      "Good understanding of linear algebra and probability"
    ],
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
