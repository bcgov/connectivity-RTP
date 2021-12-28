const schema = {
  "required": [
    "organization",
    "streetNumber",
    "streetName",
    "city",
    "postalCode"
  ],
  "properties": {
    "Applicant Profile:": {
      "properties": {
        "organization": {
          "title": "Applicant organization (legal name):",
          "type": "string"
        },
        "registrationNumber": {
          "type": "string",
          "title": "Band number, society number, or business registration number (if applicable):"
        },
        "streetNumber": {
          "type": "number",
          "title": "Street number:"
        },
        "streetName": {
          "type": "string",
          "title": "Street name:"
        },
        "city": {
          "type": "string",
          "title": "City:"
        },
        "postalCode": {
          "type": "string",
          "title": "Postal code:"
        }
      },
      "type": "object"
    },
    "Primary Contact": {
      "properties": {
        "primaryContact": {
          "type": "string",
          "title": "Primary contact (for this application):"
        },
        "postion": {
          "type": "string",
          "title": "Position/title:"
        },
        "contactEmail": {
          "type": "string",
          "title": "Email:"
        },
        "telephone": {
          "type": "number",
          "title": "Telephone:"
        }
      },
      "type": "object"
    }
  },
  "title": "Create Organization Profile"
};

export default schema;
