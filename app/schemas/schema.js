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
    },
    "preScreen": {
      "title": "Pre-Screen Information",
      "description": "How you intend to meet the program's eligibility criteria:",
      "properties": {
        "kindOfOrganization": {
          "title": "Kind of Organization (select all that apply):",
          "type": "string",
          "enum": [
            "Internet Service Provider (ISP)",
            "Municipal Government (Established by BC Legislation)",
            "Regional District (Established by BC Legislation)",
            "First Nations or First Nationals organizations (i.e. band council or a corporation controlled by a First Nation)"
          ]
        }
      },
      "required": [
        "kindOfOrganization"
      ],
      "dependencies": {
        "kindOfOrganization": {
          "oneOf": [
            {
              "properties": {
                "kindOfOrganization": {
                  "enum": [
                    "Internet Service Provider (ISP)"
                  ]
                },
                "ISPNetworkExperience": {
                  "title": "Network Experience (for ISPs):",
                  "description": "Describe the type of network and location that you currently own and have operated for at least three years (transport fibre for wholesale, fibre-tothe-home, fixed wireless LTE): ",
                  "type":"string"
                },
                "ISPTechnologyExperience": {
                  "title": "Technology Experience (for ISPs):",
                  "description": "Describe your organization’s experience of at least three years deploying the type of technologies being proposed (i.e. Transport, Last-Mile, Cellular):",
                  "type":"string"
                }
              },
              "required": [
                "ISPNetworkExperience",
                "ISPTechnologyExperience"
              ]
            },
            {
              "properties": {
                "kindOfOrganization": {
                  "enum": [
                    "Municipal Government (Established by BC Legislation)",
                    "Regional District (Established by BC Legislation)",
                    "First Nations or First Nationals organizations (i.e. band council or a corporation controlled by a First Nation)"
                  ]
                },
                "nonISPCollaborationPlan": {
                  "title": "Collaboration Plan (for non-ISPs):",
                  "description": "Describe how you will work with an ISP with at least three years of experience and their ongoing active involvement in the operation of the network.",
                  "type":"string"
                }
              },
              "required": [
                "nonISPCollaborationPlan"
              ]
            }
          ]
        }
      }
    }
  }
};

export default schema;
