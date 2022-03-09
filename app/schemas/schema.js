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
    "zoneFeedback",
    "zoneInformation",
    "wiredBroadband",
    "fixedWireless",
    "lastMileSupport",
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
    "zoneInformation": {
      "title": "Zone information",
      "type": "object",
      "properties": {
        "zoneInformation": {
          "type": "string",
          "title": "Referring to the KMZ Internet Zone data and/or the map in Appendix B, which zones are you providing feedback for? Please check all zones that apply.",
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
          "title": "Do you have any feedback on the proposed zone boundaries?  If you were to apply to a funding program by zone, are there changes to the zone boundaries that would make that process easier? Please list the zone, any proposed amendment and why. Max. 3500 characters"
        }
      }
    },
    "technologyViability": {
      "title": "Areas of focus for technology viability",
      "type": "object",
      "properties": {
        "wiredBroadband": {
          "type": "number",
          "title": "Wired broadband (fibre or coaxial) - Based on the household numbers and locations provided in the KMZ file labeled “Underserved Households in B.C.” approximately how many of the remaining underserved households in the province could be reached by wired broadband?  Please enter a whole number.",
          "description": "Approximately how many underserved households in the province could be reached by wired broadband?",
        },
        "fixedWireless": {
          "type": "number",
          "title": "Fixed wireless - Based on the household numbers and locations provided in the KMZ file labeled “Underserved Households in B.C.” approximately how many of the remaining underserved households in the province could be reached by fixed wireless? Please enter a whole number.",
          "description": "Approximately how many underserved households could be reached by fixed wireless?"
        }
      }
    },
    "backboneSupportLastMile": {
      "title": "Backbone to support last mile",
      "type": "object",
      "properties": {
        "lastMileSupport": {
          "type": "boolean",
          "title": "Is there existing backbone infrastructure?",
          "description": "Existing backbone is defined by connecting to a point of presence (PoP) in the community. New backbone is defined by requiring fibre or microwave transport to access a PoP in another community or use of satellite backbone to support your last mile project.",
          "enum": [
            true,
            false
          ],
        },
        "newBackboneTechnology": {
          "type": "array",
          "title": "If no, what type of new backbone technology would need to be built? Check all that apply.",
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
          "title": "Please add any important details for addressing gaps (existing or new) in backbone infrastructure needed to reach underserved households. For example, technology considerations, impactive geography, or connections to existing PoP. Max. 3500 characters",
          "description": "For example, technology considerations, impactive geography, or connections to existing PoP. Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "multipleBackboneDetails": {
          "title": "If multiple backbone technologies are indicated, please describe at a high level where each backbone technology could be implemented and any transport requirements. Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
      },
    },
    "additionalInfo": {
      "title": "Additional information",
      "type": "object",
      "properties": {
        "pendingProjects": {
          "title": "Are there any pending projects, and/or connectivity plans you would like to inform the Province about? For example, any additional information on planned projects including technology, number of households, communities reached, existing backbone leveraged, and new backbone that you like to include or any consultation on a proposed project taking place. (If applicable). Max. 3500 characters",
          "description": "For example, is there any additional information on technology, number of households, communities reached, existing backbone leveraged, and new backbone that you'd like to include? Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "satelliteProposal": {
          "title": "In the information linked in Appendix C of the Request to Participate, some areas were proposed to be best served by satellite. How do these proposed areas align with the expectations of your organization or your community? Please provide feedback on the modelling assumptions (if applicable). Max. 3500 characters",
          "description": "Please note, Geomark files are uploaded on the final page of this form. Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "underservedAreas": {
          "title": "In underserved areas where your Geomark does not indicate a wired or wireless technology viability to serve those households, how could service providers be incentivized to serve those areas? Please note, Geomark files are uploaded on the final page of this form (If applicable.) Max. 3500 characters",
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
          "title": "If funding was available for capital costs, which sections of highway could be completed Please consider traffic and consumption factors. Please list the sections of highway. Max. 3500 characters",
          "description": "Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        },
        "capitalCostExplanation": {
          "title": "Please explain why you chose those sections. Max. 3500 characters",
          "description": "Max. 3500 characters",
          "type": "string",
          "maxLength": 10000
        }
      }
    },
    "connectivityFocus": {
      "title": "Areas of focus for connectivity for local and indigenous governments",
      "type": "object",
      "properties": {
        "govtIndigenousConnFocus": {
          "title": "In addition, we are looking to local governments and First Nations to offer feedback on connectivity in their communities. This includes areas that are underserved, as well as any other local information considered relevant. This response will be related to the zone(s) specified and could include any particular area of focus for local governments, including any specific challenges with infrastructure or any other information pertinent to the area.",
          "type": "string"
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
