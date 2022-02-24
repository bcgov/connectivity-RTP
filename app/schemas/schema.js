const schema = {
  "type": "object",
  "required": [
    "organization",
    "streetNumber",
    "streetName",
    "city",
    "postalCode"
  ],
  "properties": {
    "Organization Profile": {
      "title": "Organization Profile",
      "type": "object",
      "properties": {
        "organization": {
          "title": "Organization name (legal name)",
          "type": "string"
        },
        "registrationNumber": {
          "type": "string",
          "title": "Band number, society number, or business registration number (optional)"
        },
        "unitNumber": {
          "type": "number",
          "title": "Unit number (optional)"
        },
        "streetNumber": {
          "type": "number",
          "title": "Street number"
        },
        "poBox": {
          "type": "number",
          "title": "PO Box (optional)"
        },
        "streetName": {
          "type": "string",
          "title": "Street name"
        },
        "city": {
          "type": "string",
          "title": "City"
        },
        "postalCode": {
          "type": "string",
          "title": "Postal code (H0H 0H0)"
        }
      },
    },
    "Contact Information": {
      "title": "Contact Information",
      "type": "object",
      "properties": {
        "primaryContact": {
          "type": "string",
          "title": "Primary contact"
        },
        "postion": {
          "type": "string",
          "title": "Position/Title"
        },
        "contactEmail": {
          "type": "string",
          "title": "Email (email@address.com)"
        },
        "telephone": {
          "type": "number",
          "title": "Telephone (6045551234)"
        },
        "extension": {
          "type": "number",
          "title": "Extension (optional)"
        },
      },
    },
    "Proposed Zone Feedback": {
      "title": "Proposed Zone Feedback",
      "type": "object",
      "properties": {
        "proposedZoneFeedback": {
          "type": "string",
          "title": "Please refer to the Zone Map in the Request to Participate - Appendix A to respond to the following question.",
          "description": "What feedback do you have on the proposed zone boundaries? If you were to apply to a funding program by zone, are there alterations to the zone boundaries that would make that easier?(3500 characters)",
          "maxLength": 10000
        }
      }
    },
    "Technology Viability": {
      "title": "Technology Viability",
      "description": "We're looking to identify where there could be viable business cases and technical suitability for fibre to the home, coax to the home or wireless last mile solutions, and cellular availability along highways.",
      "type": "object",
      "properties": {
        "technologyViability": {
          "type": "number",
          "title": "Wired Broadband (Fibre or Coaxial)",
          "description": "Approximately how many underserved households in the province could be reached by wired broadband?",
        },
        "fixedWireless": {
          "type": "number",
          "title": "Fixed Wireless",
          "description": "Approximately how many underserved households could be reached by fixed wireless?"
        }
      }
    },
    "Backbone to Support Last Mile": {
      "title": "Backbone to Support Last Mile",
      "type": "object",
      "properties": {
        "Last Mile Support": {
          "type": "boolean",
          "title": "Would it be possible to leverage existing backbone to implement the last mile technologies you indicated in the previous question? ",
          "description": "Existing backbone is defined by connecting to a point of presence (PoP) in the community. New backbone is defined by requiring fibre or microwave transport to access a PoP in another community or use of satellite backbone to support your last mile project.",
          "enum": [
            true,
            false
          ],
        },
        "New Backbone Technology": {
          "type": "array",
          "title": "If no, what type of new backbone technology would need to be built?",
          "items": {
            "type": "string",
            "enum": [
              "Fibre",
              "Microwave",
              "Satellite"
            ]
          },
          "uniqueItems": true,
        },
        "New Tech Details": {
          "title": "Please add any important details for addressing gaps in backbone needed to reach underserved households.",
          "description": "For example, technology considerations, impactive geography, or connections to existing PoP. (3500 characters)",
          "type": "string"
        },
        "Additional New Tech Details": {
          "title": "If multiple backbone technologies are indicated, please describe at a high level where each backbone technology could be implemented and any transport requirements. (3500 characters)",
          "type": "string"
        },
      },
    },
    "Additional Questions": {
      "title": "Additional Questions",
      "type": "object",
      "properties": {
        "Anticipated Projects": {
          "title": "Are there any specific planned or anticipated projects you want to tell us about?",
          "description": "For example, is there any additional information on technology, number of households, communities reached, existing backbone leveraged, and new backbone that you'd like to include? (3500 characters)",
          "type": "string"
        },
        "Underserved Areas": {
          "title": "For underserved areas where your Geomark does not indicate a wired or wireless technology viability or to serve those households, how could internet service providers be incentivized to serve those areas?",
          "description": "Please note, Geomark files are uploaded on the final page of this form. (3500 characters)",
          "type": "string"
        },
        "Satellite Proposal": {
          "title": "In the information linked in Appendix C of the RTP, some areas were proposed to be best served by satellite. How do these proposed areas align with the expectations of your organization? Please provide feedback on the modelling assumptions.",
          "description": "(3500 characters)",
          "type": "string"
        }
      }
    }
  },
}


export default schema;
