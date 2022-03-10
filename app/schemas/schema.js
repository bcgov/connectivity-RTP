const schema = {
  "type": "object",
  "required": [
    "organizationType",
    "organizationName",
    "streetNumber",
    "streetName",
    "city",
    "postalCode",
    "primaryContact",
    "postion",
    "contactEmail",
    "telephone",
  ],
  "properties": {
    "organizationInfo": {
      "title": "Organization information",
      "type": "object",
      "properties": {
        "organizationType": {
          "title": "Organization type",
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "Service provider",
              "Local or regional government",
              "First nation",
              "Other"
            ]
          },
          "uniqueItems": true
        }
      }
    },
    "organizationProfile": {
      "title": "Organization profile",
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
      "title": "Contact information",
      "type": "object",
      "properties": {
        "primaryContact": {
          "type": "string",
          "title": "Primary contact"
        },
        "postion": {
          "type": "string",
          "title": "Position/title"
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
    "zoneInfo": {
      "title": "Zone information",
      "type": "object",
      "properties": {
        "zoneInformation": {
          "title": "Referring to the Internet Zone Map (Appendix C) or the KMZ Internet Zones data (Appendix D), which zones are you providing feedback for? Please check all zones that apply.",
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"
            ]
          },
          "uniqueItems": true,
        },
        "zoneFeedback": {
          "type": "string",
          "title": "Do you have any feedback on the proposed zone boundaries?  If you were to apply to a funding program by zone, are there changes to the zone boundaries that would make that process easier? Please list the zone, any proposed amendment and why (if applicable)."
        }
      }
    },
    "technologyViability": {
      "title": "Areas of focus for technology viability",
      "type": "object",
      "properties": {
        "wiredBroadband": {
          "type": "number",
          "title": "Based on the household numbers and locations provided in the KMZ file labeled “Underserved Households in B.C.” approximately how many of the remaining underserved households in the province could be reached by wired broadband?  Please enter a whole number (if applicable).",
          "description": "Approximately how many underserved households in the province could be reached by wired broadband?",
        },
        "fixedWireless": {
          "type": "number",
          "title": "Based on the household numbers and locations provided in the KMZ file labeled “Underserved Households in B.C.” approximately how many of the remaining underserved households in the province could be reached by fixed wireless? Please enter a whole number (if applicable).",
          "description": "Approximately how many underserved households could be reached by fixed wireless?"
        }
      }
    },
    "backboneSupportLastMile": {
      "title": "Backbone infrastructure to support last mile",
      "type": "object",
      "properties": {
        "lastMileSupport": {
          "type": "boolean",
          "title": "For the information described in the previous question, is there existing backbone infrastructure to deliver the last mile projects as specified? (if applicable)",
          "description": "Existing backbone is defined by connecting to a point of presence (PoP) in the community. New backbone is defined by requiring fibre or microwave transport to access a PoP in another community or use of satellite backbone to support your last mile project.",
          "enum": [
            true,
            false
          ],
        },
        "newBackboneTechnology": {
          "type": "array",
          "title": "If no, what type of new backbone technology would need to be built? Check all that apply (if applicable)",
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
          "title": "Please add any important details for addressing gaps (existing or new) in backbone infrastructure needed to reach underserved households. For example, technology considerations, impactive geography, or connections to existing PoP (if applicable).",
          "description": "For example, technology considerations, impactive geography, or connections to existing PoP. Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "multipleBackboneDetails": {
          "title": "If multiple backbone technologies are indicated, please describe at a high level where each backbone technology could be implemented and any transport requirements (if applicable).",
          "type": "string",
          "maxLength": 10000
        },
      },
    },
    "connectivityFocus": {
      "title": "Areas of focus for local governments and First Nations",
      "type": "object",
      "properties": {
        "govtIndigenousConnFocus": {
          "title": "What additional feedback on internet connectivity do you have for your community? Please include information on areas that are underserved, as well as any other local information considered relevant. This response will be related to the zone(s) specified in your response and could include any particular area of focus, including challenges with infrastructure or information pertinent to the area (if applicable).",
          "type": "string"
        }
      }
    },
    "additionalInfo": {
      "title": "Additional internet connectivity information",
      "type": "object",
      "properties": {
        "pendingProjects": {
          "title": "Are there any pending projects you would like to inform the Province about? For example, any additional information on planned projects including technology, number of households, communities reached, existing backbone leveraged, new backbone that you like to include, or any consultation on a proposed project taking place (if applicable). Max. 3500 characters",
          "description": "For example, is there any additional information on technology, number of households, communities reached, existing backbone leveraged, and new backbone that you'd like to include? Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "satelliteProposal": {
          "title": "In the KMZ file for Household Density Data linked in Appendix D of the RTP document, some areas were proposed to be best served by satellite. How do these proposed areas align with the expectations of your organization or your community? Please provide feedback on the modelling assumptions (if applicable).",
          "description": "Please note, Geomark files are uploaded on the final page of this form. Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "underservedAreas": {
          "title": "In underserved areas where your Geomark does not indicate a wired or wireless technology viability to serve those households, how could service providers be incentivized to serve those areas? Please note, Geomark files are uploaded on the final page of this form (if applicable).",
          "description": "Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        }
      }
    },
    "highwayCellular": {
      "title": "Highway cellular",
      "type": "object",
      "properties": {
        "capitalCostFunding": {
          "title": "If funding was available for capital costs, which sections of highway would be your priority to be completed? Please consider traffic, consumption and other factors.",
          "description": "Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "capitalCostExplanation": {
          "title": "Please explain why you chose those sections",
          "description": "Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        }
      }
    },
    "geomarks": {
      "title": "Upload geomarks",
      "type": "object",
      "properties": {
        "lastMileBroadbandGeomark": {
          "title": "Wired broadband last mile (paste link to the Geomark below) (if applicable)",
          "type": "string"
        },
        "lastMileFixedWirelessGeomark": {
          "title": "Fixed wireless last mile (paste link to the Geomark below) (if applicable)",
          "type": "string"
        },
        "lastMileNewBackboneGeomark": {
          "title": "New backbone technology possibly needed for last mile (paste link to the Geomark below) (if applicable)",
          "type": "string"
        },
        "highwayCellularGeomark": {
          "title": "Cellular along powered highways (paste link to the Geomark below) (if applicable)",
          "type": "string"
        }
      }
    }
  }
}

export default schema;
