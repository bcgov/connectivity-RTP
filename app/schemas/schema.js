const schema = {
  "type": "object",
  "required": [
    "organizationName",
    "streetNumber",
    "streetName",
    "city",
    "postalCode",
    "primaryContact",
    "postion",
    "contactEmail",
    "telephone",
    "zoneFeedback",
    "wiredBroadband",
    "fixedWireless",
    "lastMileSupport",
    "anticipatedProjects",
    "underservedAreas",
    "satelliteProposal",
    "capitalCostFunding",
    "capitalCostExplanation"
  ],
  "properties": {
    "organizationProfile": {
      "title": "Organization Profile",
      "type": "object",
      "properties": {
        "organizationName": {
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
    "contactInformation": {
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
    "proposedZoneFeedback": {
      "title": "Proposed Zone Feedback",
      "type": "object",
      "properties": {
        "zoneFeedback": {
          "type": "string",
          "title": "Please refer to the Zone Map in the Request to Participate - Appendix A to respond to the following question. What feedback do you have on the proposed zone boundaries? If you were to apply to a funding program by zone, are there alterations to the zone boundaries that would make that easier? (Max. 3500 characters)",
          "description": "What feedback do you have on the proposed zone boundaries? If you were to apply to a funding program by zone, are there alterations to the zone boundaries that would make that easier?(Max. 3500 characters)",
          "maxLength": 10000
        }
      }
    },
    "technologyViability": {
      "title": "Technology Viability",
      "description": "We're looking to identify where there could be viable business cases and technical suitability for fibre to the home, coaxial to the home or wireless last mile solutions, and cellular availability along highways.",
      "type": "object",
      "properties": {
        "wiredBroadband": {
          "type": "number",
          "title": "Wired Broadband (Fibre or Coaxial) - Approximately how many underserved households in the province could be reached by wired broadband?",
          "description": "Approximately how many underserved households in the province could be reached by wired broadband?",
        },
        "fixedWireless": {
          "type": "number",
          "title": "Fixed Wireless - Approximately how many underserved households could be reached by fixed wireless?",
          "description": "Approximately how many underserved households could be reached by fixed wireless?"
        }
      }
    },
    "backboneSupportLastMile": {
      "title": "Backbone to Support Last Mile",
      "type": "object",
      "properties": {
        "lastMileSupport": {
          "type": "boolean",
          "title": "Would it be possible to leverage existing backbone to implement the last mile technologies you indicated in the previous question? Existing backbone is defined by connecting to a point of presence (PoP) in the community. New backbone is defined by requiring fibre or microwave transport to access a PoP in another community or use of satellite backbone to support your last mile project.",
          "description": "Existing backbone is defined by connecting to a point of presence (PoP) in the community. New backbone is defined by requiring fibre or microwave transport to access a PoP in another community or use of satellite backbone to support your last mile project.",
          "enum": [
            true,
            false
          ],
        },
        "newBackboneTechnology": {
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
        "backboneGaps": {
          "title": "Please add any important details for addressing gaps in backbone needed to reach underserved households. For example, technology considerations, impactive geography, or connections to existing PoP. (Max. 3500 characters)",
          "description": "For example, technology considerations, impactive geography, or connections to existing PoP. (Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        },
        "multipleBackboneDetails": {
          "title": "If multiple backbone technologies are indicated, please describe at a high level where each backbone technology could be implemented and any transport requirements. (Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        },
      },
    },
    "additionalQuestions": {
      "title": "Additional Questions",
      "type": "object",
      "properties": {
        "anticipatedProjects": {
          "title": "Are there any specific planned or anticipated projects you want to tell us about? For example, is there any additional information on technology, number of households, communities reached, existing backbone leveraged, and new backbone that you'd like to include? (Max. 3500 characters)",
          "description": "For example, is there any additional information on technology, number of households, communities reached, existing backbone leveraged, and new backbone that you'd like to include? (Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        },
        "underservedAreas": {
          "title": "For underserved areas where your Geomark does not indicate a wired or wireless technology viability to serve those households, how could internet service providers be incentivized to serve those areas? Please note, Geomark files are uploaded on the final page of this form. (Max. 3500 characters)",
          "description": "Please note, Geomark files are uploaded on the final page of this form. (Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        },
        "satelliteProposal": {
          "title": "In the information linked in Appendix C of the Request to Participate, some areas were proposed to be best served by satellite. How do these proposed areas align with the expectations of your organization? Please provide feedback on the modelling assumptions. (Max. 3500 characters)",
          "description": "(Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        }
      }
    },
    "highwayCellular": {
      "title": "Highway Cellular",
      "description": "The Province has identified gaps in cellular service along powered highways in BC for respondents’ reference. This information is contained in the KMZ file linked in Appendix C of the Request to Participate.",
      "type": "object",
      "properties": {
        "capitalCostFunding": {
          "title": "If funding was available for capital costs, which sections of highway could be completed? Please consider traffic and consumption factors. Please list the sections of highway. (Max. 3500 characters)",
          "description": "(Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        },
        "capitalCostExplanation": {
          "title": "Please explain why you chose those sections. (Max. 3500 characters)",
          "description": "(Max. 3500 characters)",
          "type": "string",
          "maxLength": 10000
        }
      }
    },
    "geomarks": {
      "title": "Geomarks",
      "type": "object",
      "properties": {
        "lastMileBroadbandGeomark": {
          "title": "Wired broadband last mile (paste link to the Geomark below)",
          "type": "string"
        },
        "lastMileFixedWirelessGeomark": {
          "title": "Fixed wireless last mile (paste link to the Geomark below)",
          "type": "string"
        },
        "lastMileNewBackboneGeomark": {
          "title": "New backbone technology possibly needed for last mile (paste link to the Geomark below)",
          "type": "string"
        },
        "highwayCellularGeomark": {
          "title": "Cellular along powered highways (paste link to the Geomark below)",
          "type": "string"
        }
      }
    }
  }
}

export default schema;
