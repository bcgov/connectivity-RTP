const schema = {
  "title": "Request to Participate",
  "type": "object",
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
    },
    "technologies": {
      "title": "Technologies",
      "description": "Technologies for which you are intested in submitting applications:",
      "properties": {
        "transport": {
          "type": "array",
          "title": "Transport:",
          "items": {
            "type": "string",
            "enum": [
              "Fibre transport",
              "Microwave transport",
              "Satellite backhaul"
            ]
          },
          "uniqueItems": true
        },
        "lastMile": {
          "type": "array",
          "title": "Last-Mile Projects:",
          "items": {
            "type": "string",
            "enum": [
              "Fibre to the home",
              "Co-axial cable",
              "Fixed wireless (LTE preferred)",
              "Satellite to the home"
            ]
          },
          "uniqueItems": true
        },
        "highway": {
          "type": "array",
          "title": "Highway cellular:",
          "items": {
            "type": "string",
            "enum": [
              "Cellular coverage (LTE preferred)",
              "Rest-stop wi-fi",
              "Highway call boxes"
            ]
          },
          "uniqueItems": true
        }
      },
      "type": "object"
    }
  }  
};

export default schema;
