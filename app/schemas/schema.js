const schema = {
  "required": [
    "Full Name"
  ],
  "properties": {
    "Full Name": {
      "title": "Full Name",
      "type": "string"
    },
    "Group1": {
      "properties": {
        "First": {
          "title": "Question #1",
          "type": "string"
        },
        "Second": {
          "title": "Question #2",
          "type": "string"
        }
      },
      "type": "object",
      "description": "Grouped Fields 1"
    },
    "Group2": {
      "properties": {
        "Third": {
          "title": "Question #3",
          "type": "string"
        },
        "Forth": {
          "title": "Question #4",
          "type": "string"
        }
      },
      "type": "object",
      "description": "Grouped Fields 2"
    }
  },
  "title": "Connectivity Intake"
};

export default schema;
